import Nav from "./component/nav/Nav";
import "./App.css";
import Input from "./component/inputs and button/Input";
import Post from "./component/post/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Modal from "./component/modal/Modal";
import FileUpload from "./component/modal/fileUplodModal";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import showAlert from "./component/helper/showAlert";
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  const socket = useRef();
  const baseUrl = process.env.BaseUrl || "http://localhost:8000/api/v1"
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
  const [progressPer, setProgressPer] = useState("")
  const [isClassFound, setIsClassFound] = useState(false)



  const admin = "Saylani9321";

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
      localStorage.setItem("theme", "light")
    }
  }, [])

  const getClass = async (val) => {
    setClassID(val.classId);
    try {
      let response = await axios
        .get(`${baseUrl}/getItem/${val.classId}`)
      setData(response.data);
      console.log(response.data)
      if (response.data.error) {
        setToDoData([]);
        showAlert({
          msg: response.data.error,
          type: "error"
        })
        setIsClassFound(true)
      } else {
        setToDoData(response.data[0].classData);
        setIsClassFound(false)
      }
      let ipResponse = await axios
        .get(`${baseUrl}/${`ip`}`)
      setPublicIp(userIp(ipResponse.data));
    } catch (error) {
      console.log(error)
    }




  };

  // useEffect(() => {
  //   const getAllData = async () => {
  //     if (classID === "") {
  //       await axios
  //         .get(`${baseUrl}/getItem/${classID}`)
  //         .then(function (response) {
  //           setData(response.data);
  //           if (response.data.error) {
  //             setToDoData([]);
  //             showAlert({
  //               msg: response.data.error,
  //               type: "error"
  //             })
  //           } else {
  //             setToDoData(response.data[0].classData);
  //           }
  //         })
  //         .catch(function (error) { })
  //         .finally(function () { });
  //     } else {

  //     }
  //   };
  //   getAllData();
  //   // eslint-disable-next-line
  // }, []);

  const getInput = async (val) => {
    try {
      await axios
        .post(`${baseUrl}/addItem/${data[0]._id}`, {
          text: val.inputText,
          cType: classID.toString(),
          ip: publicIp
        })

      await socket.current.emit("chat message", {
        text: val.inputText,
        cType: classID.toString(),
        ip: publicIp
      })

    } catch (error) {
      console.log(error)
    }
    setFetchData(!fetchData);
    setIsCLick(!isCLick);
  };

  const clearAll = async () => {
    try {
      if (adminPassword === admin) {
        setIfPassNotMatch(false);
        await axios.delete(`${baseUrl}/delete/${data[0]._id}/${classID}`)
        setToDoData([]);
        setModalIsOpen(false)
      } else {
        showAlert({
          msg: "Password dose not match",
          type: "error"
        })
      }
    } catch (error) {
    }
  };
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };

  const postFile = async () => {
    setFileLoader(true)
    let formData = new FormData();
    formData.append("todoFile", uploadFile);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total)
        setProgressPer(percent)
        if (percent >= 100) {
          setProgressPer("")
        }
      }
    }
    try {
      if (classID === "") {
        setFileLoader(false)
      } else {
        const response = await axios.post(`${baseUrl}/upload`, formData, options)
        socket.current.emit("chat message", {
          url: response.data,
          fileType: getFileType(uploadFile.type),
          cType: classID.toString(),
          ip: publicIp
        });
        await axios.post(
          `${baseUrl}/addItem/${data[0]._id}`,
          {
            url: response.data,
            cType: classID.toString(),
            fileType: getFileType(uploadFile.type),
            ip: publicIp
          }
        );
        setFileLoader(false)
      }
    } catch (error) {
      console.log("axios ", error);
    }
  };
  const deleteOne = (id) => {
    console.log(id)
}

const uploadFilehandleClose = () => {
  setUpLoadModal(false);
};

const uploadFilehandleOpen = () => {
  setUpLoadModal(true);
};
const adminPass = (val) => {
  setAdminPassword(val);
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
    <Modal
      modalState={modalIsOpen}
      adminPass={adminPass}
      handleClose={handleClose}
      handleSubmit={clearAll}
      ifError={ifPassNotMatch}
    />

    <FileUpload
      modalState={upLoadModal}
      handleClose={uploadFilehandleClose}
      handleSubmit={postFile}
      postFile={setUploadFile}
      isLoading={fileLoader}
      progress={Number(progressPer)}
    />
    <ToastContainer />
    <header>
      <Nav />
    </header>
    <main>
      <section className="top">
        <Input
          getClass={getClass}
          getInput={getInput}
          handleOpenModal={handleOpenModal}
          uploadFilehandleOpen={uploadFilehandleOpen}
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
              ipAdders={eachToDo?.ip}
              deleteItem={()=> deleteOne(eachToDo?._id)}
            />
          ))}
        </ul>
      </section>
    </main>
  </>
);
};

export default App;
