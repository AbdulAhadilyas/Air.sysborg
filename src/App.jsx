import Nav from "./component/nav/Nav";
import "./App.css";
import Input from "./component/inputs and button/Input";
import Post from "./component/post/Post";
import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Danger from "./component/Alert/Danger";
import Modal from "./component/modal/Modal";
import FileUpload from "./component/modal/fileUplodModal";

export const App = () => {
  const socket = io.connect("http://localhost:8000", {
    transports: ["websocket"],
  });
  const baseUrl = process.env.BaseUrl || "http://localhost:8000/api/v1"
  const [toDoData, setToDoData] = useState([]);
  const [data, setData] = useState([]);
  const [soketTodo, setSoketTodo] = useState(null);
  const [classID, setClassID] = useState("");
  const [isCLick, setIsCLick] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [isError, setsError] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [open, setOpen] = useState(false);
  const [upLoadModal, setUpLoadModal] = useState(false);
  const [publicIp, setPublicIp] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [ifPassNotMatch, setIfPassNotMatch] = useState(false);
  const [uploadFile, seTuploadFile] = useState("");
  const [url, setUrl] = useState("");
  const [fileLoader, setFileLoader] = useState(false);
  const [progressPer, setprogressPer] = useState("")

  const admin = "Saylani9321";

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected");
    });
    // eslint-disable-next-line
  }, []);

  const getClass = async (val) => {
    setClassID(val.classId);
    await axios
      .get(`${baseUrl}/getItem/${val.classId}`)
      .then(function (response) {
        setData(response.data);
        console.log("response.data:", response.data);
        if (response.data.error) {
          setToDoData([]);
          setsError(response.data.error);
          setErrorState(true);
          setTimeout(() => {
            setErrorState(false);
          }, 1500);
        } else {
          setToDoData(response.data[0].classData);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () { });
    await axios
      .get(`http://localhost:8000/${`ip`}`)
      .then(function (response) {
        setPublicIp(userIp(response.data));
      })
      .catch(function (error) { })
      .finally(function () { });
  };
  useEffect(() => {
    const getAllData = async () => {
      if (classID === "") {
        await axios
          .get(`${baseUrl}/getItem/${classID}`)
          .then(function (response) {
            console.log(response.data);
            setData(response.data);
            if (response.data.error) {
              setToDoData([]);
              setsError(response.data.error);
              setErrorState(true);
              setTimeout(() => {
                setErrorState(false);
              }, 1500);
            } else {
              setToDoData(response.data[0].classData);
              console.log(response.data[0].classData);
            }
          })
          .catch(function (error) { })
          .finally(function () { });
      } else {
        console.log("no class sec");
      }
    };
    getAllData();
    // eslint-disable-next-line
  }, []);

  const userIp = (val) => {
    return val.split(":").slice(-1)[0];
  };
  const getInput = async (val) => {
    if (classID === "") {
      setErrorState(true);
      setTimeout(() => {
        setErrorState(false);
      }, 1500);
    } else {
      await socket.emit("chat message", {
        text: val.inputText,
        cType: classID.toString(),
        ip:publicIp
      });
      await axios
        .post(`${baseUrl}/addItem/${data[0]._id}`, {
          text: val.inputText,
          cType: classID.toString(),
          ip:publicIp
        })
        .then(function (response) { })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () { });
    }
    setFetchData(!fetchData);
    setIsCLick(!isCLick);
  };

  const clearAll = async () => {
    if (adminPassword === admin) {
      console.log("matched ");
      setIfPassNotMatch(false);

      await axios
        .delete(`${baseUrl}/delete/${data[0]._id}/${classID}`)
        .then(function (response) {
          console.log(response.data);
          setToDoData([]);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () { });
    } else {
      console.log("not matched ");
      setIfPassNotMatch(true);
      setTimeout(() => {
        setIfPassNotMatch(false);
      }, 1200);
    }
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const postFile = async () => {
    setFileLoader(true)
    let formData = new FormData();
    formData.append("todoFile", uploadFile);
    // console.log(uploadFile.type)
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setprogressPer(percent)
        console.log(progressPer)
      }
    }
    try {
      if (classID === "") {
        console.log("no class selected")
        setFileLoader(false)
      } else {
        const response = await axios.post(`${baseUrl}/upload`, formData, options)
        setUrl(response.data);
        socket.emit("chat message", {
          url: response.data,
          fileType: getFileType(uploadFile.type),
          cType: classID.toString(),
          ip:publicIp
        });
        const imageTodo = await axios.post(
          `${baseUrl}/addItem/${data[0]._id}`,
          {
            url: response.data,
            cType: classID.toString(),
            fileType: getFileType(uploadFile.type),
            ip:publicIp
          }
        );
        console.log("imageTodo", imageTodo);
        setFileLoader(false)
      }
    } catch (error) {
      console.log("axios ", error);
    }
    console.log(getFileType(uploadFile.type));
  };

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
      socket.on("chat message", (msg) => {
        setSoketTodo(msg);
        console.log(msg);
      });
    };
    if (soketTodo) {
      if (soketTodo.cType === classID) {
        setToDoData([soketTodo, ...toDoData]);
      }
    }
    getSocketTodo();
    // eslint-disable-next-line
  }, [soketTodo]);

  const getFileType = (val) => {
    let type = "";
    type = val.split("/");
    console.log(type[1]);
    return type[1];
  };
  console.log(publicIp)
  return (
    <>
      <Modal
        modalState={open}
        adminPass={adminPass}
        handleClose={handleClose}
        handleSubmit={clearAll}
        ifError={ifPassNotMatch}
      
      />
    
      <FileUpload
        modalState={upLoadModal}
        handleClose={uploadFilehandleClose}
        handleSubmit={postFile}
        postFile={seTuploadFile}
        isLoading={fileLoader}
        progress={Number(progressPer)}
      />
      <div className="alert">
        <div className="alert-left">
          {errorState ? <Danger errorTxt={isError} /> : null}
        </div>
      </div>
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
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default App;
