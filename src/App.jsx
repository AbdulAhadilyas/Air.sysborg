import Nav from "./component/nav/Nav";
import "./App.css";
import Input from "./component/inputs and button/Input";
import Post from "./component/post/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import ClearALlModal from "./component/modal/Modal";
import DeleteOneModal from "./component/modal/Modal";
import FileUpload from "./component/modal/fileUplodModal";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import showAlert from "./component/helper/showAlert";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { GlobalContext } from "./Context/context";
export const App = () => {
  const socket = useRef();
  const { state } = useContext(GlobalContext);
  const [toDoData, setToDoData] = useState([]);
  const [data, setData] = useState([]);
  const [socketTodo, setSocketTodo] = useState(null);
  const [classID, setClassID] = useState("");
  const [isCLick, setIsCLick] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [upLoadModal, setUpLoadModal] = useState(false);
  const [publicIp, setPublicIp] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [ifPassNotMatch, setIfPassNotMatch] = useState(false);
  const [uploadFile, setUploadFile] = useState("");
  const [fileLoader, setFileLoader] = useState(false);
  const [progressPer, setProgressPer] = useState("");
  const [isClassFound, setIsClassFound] = useState(true);
  const [deleteOneModal, setDeleteOneModal] = useState(false);
  const [deleteOneId, setDeleteOneId] = useState("");

  const admin = process.env.REACT_APP_ADMIN_PSS;

  useEffect(() => {
    socket.current = io("http://localhost:8000", {
      transports: ["websocket"],
    });
    socket.current.on("connnection", () => {
      console.log("connected to server");
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const getClass = async (val) => {
    setClassID(val.classId);
    try {
      let response = await axios.get(`${state.BASEURl}/getItem/${val.classId}`);
      setData(response.data);
  
      if (response.data.error) {
        setToDoData([]);
        showAlert({
          msg: response.data.error,
          type: "error",
        });
        setIsClassFound(true);
      } else {
        setToDoData(response.data[0].classData);
        setIsClassFound(false);
      }
      let ipResponse = await axios.get(`${state.BASEURl}/${`ip`}`);
      setPublicIp(userIp(ipResponse.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllData = async () => {
    await axios
      .get(`${state.BASEURl}/getItem/${classID}`)
      .then(function (response) {
        setData(response.data);
   
        if (response.data.error) {
          setToDoData([]);
          showAlert({
            msg: response.data.error,
            type: "error",
          });
        } else {
          setToDoData(response.data[0].classData);
        }
      })
      .catch(function (error) {})
      .finally(function () {});
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line 
  }, []);

  const getInput = async (val) => {
    try {
      await axios.post(`${state.BASEURl}/addItem/${data[0]._id}`, {
        text: val.inputText,
        cType: classID.toString(),
        ip: publicIp,
      });

      await socket.current.emit("chat message", {
        text: val.inputText,
        cType: classID.toString(),
        ip: publicIp,
      });
    } catch (error) {
      console.log(error);
    }
    setFetchData(!fetchData);
    setIsCLick(!isCLick);
  };

  const clearAll = async () => {
    try {
      if (adminPassword === admin) {
        setIfPassNotMatch(false);
        await axios.delete(`${state.BASEURl}/delete/${data[0]._id}/${classID}`);
        setToDoData([]);
        setModalIsOpen(false);
        showAlert({
          msg: "Clear Successfully ",
          type: "success",
        });
      } else {
        showAlert({
          msg: "Password dose not match",
          type: "error",
        });
      }
    } catch (error) {}
  };

  const postFile = async () => {
    setFileLoader(true);
    let formData = new FormData();
    formData.append("todoFile", uploadFile);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgressPer(percent);
        if (percent >= 100) {
          setProgressPer("");
        }
      },
    };
    try {
      if (classID === "") {
        setFileLoader(false);
      } else {
        const response = await axios.post(
          `${state.BASEURl}/upload`,
          formData,
          options
        );
        socket.current.emit("chat message", {
          url: response.data,
          fileType: getFileType(uploadFile.type),
          cType: classID.toString(),
          ip: publicIp,
        });
        await axios.post(`${state.BASEURl}/addItem/${data[0]._id}`, {
          url: response.data,
          cType: classID.toString(),
          fileType: getFileType(uploadFile.type),
          ip: publicIp,
        });
        showAlert({
          msg: "Upload Successfully ",
          type: "success",
        });
        setFileLoader(false);
      }
    } catch (error) {
      console.log("axios ", error);
    }
  };
  const deleteOne = async () => {
    try {
      if (adminPassword === admin) {
        setIfPassNotMatch(false);
        await axios.delete(
          `${state.BASEURl}/delete-one/${data[0]._id}/${deleteOneId}`
        );
        setDeleteOneModal(false);
        getAllData();
        showAlert({
          msg: "Delete Successfully ",
          type: "success",
        });
      } else {
        showAlert({
          msg: "Password dose not match",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const getSocketTodo = () => {
      socket.current.on("chat message", (msg) => {
        setSocketTodo(msg);
      });
    };
    if (socketTodo) {
      if (socketTodo.cType === classID) {
        setToDoData([socketTodo, ...toDoData]);
      }
    }
    getSocketTodo();
// eslint-disable-next-line 
  }, [socketTodo]);

  const getFileType = (val) => {
    let type = "";
    type = val.split("/");
    return type[1];
  };
  const userIp = (val) => {
    return val.split(":").slice(-1)[0];
  };
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <section className="top">
          <Input
            getClass={getClass}
            getInput={getInput}
            handleOpenModal={() => setModalIsOpen(true)}
            uploadFilehandleOpen={() => setUpLoadModal(true)}
            classFound={isClassFound}
          />
        </section>
        <section className="main-content">
          <ul className="list">
            {toDoData.map((eachToDo, i) => (
              <Post
                text={eachToDo?.text}
                time={eachToDo?.createOn}
                key={i}
                fileType={eachToDo?.fileType}
                fileUrl={eachToDo?.url}
                ipAdders={"10.10.10.4   "}
                deleteItem={() => {
                  setDeleteOneId(eachToDo?._id);
                  setDeleteOneModal(!deleteOneModal);
                }}
              />
            ))}
          </ul>
        </section>
      </main>

      <ClearALlModal
        modalState={modalIsOpen}
        adminPass={(val) => setAdminPassword(val)}
        handleClose={() => setModalIsOpen(false)}
        handleSubmit={clearAll}
        ifError={ifPassNotMatch}
      />
      <DeleteOneModal
        modalState={deleteOneModal}
        adminPass={(val) => setAdminPassword(val)}
        handleClose={() => setDeleteOneModal(false)}
        handleSubmit={deleteOne}
        ifError={ifPassNotMatch}
      />

      <FileUpload
        modalState={upLoadModal}
        handleClose={() => setUpLoadModal(false)}
        handleSubmit={postFile}
        postFile={setUploadFile}
        isLoading={fileLoader}
        progress={Number(progressPer)}
      />
      <ToastContainer />
    </>
  );
};

export default App;
