import Nav from "./component/nav/Nav";
import "./App.css";
import Input from "./component/inputs and button/Input";
import Post from "./component/post/Post";
import axios from 'axios';
import { useState, useEffect } from "react";
import io from 'socket.io-client';
import Danger from "./component/Alert/Danger";
import Modal from "./component/modal/Modal"
export const App = () => {

  const socket = io.connect("http://localhost:8000", { transports: ['websocket'] });
  const [toDoData, setToDoData] = useState([]);
  const [data, setData] = useState([]);
  const [classID, setClassID] = useState("");
  const [isCLick, setIsCLick] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [isError, setsError] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [open, setOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [ifPassNotMatch, setIfPassNotMatch] = useState(false);
  const admin = "Saylani9321"

  // useEffect(() => {
  //   socket.on('connection', () => {
  //     console.log("connected")
  //   });

  // }, [])

  const getClass = async (val) => {
    setClassID(val.classId)
    await axios.get(`http://localhost:8000/data/getItem/${val.classId}`)
      .then(function (response) {
        // console.log(response.data)
        setData(response.data)
        if (response.data.error) {
          setToDoData([])
          setsError(response.data.error)
          setErrorState(true)
          setTimeout(() => {
            setErrorState(false)
          }, 1500);
        } else {
          setToDoData(response.data[0].classData)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {

      });
  }


  const getInput = async (val) => {
    if (classID === "") {
      setErrorState(true)
      setTimeout(() => {
        setErrorState(false)
      }, 1500);
    } else {
      await axios.post(`http://localhost:8000/data/addItem/${data[0]._id}`, {
        "text": val.inputText,
        "cType": classID.toString()
      })
        .then(function (response) {
          socket.emit('chat message', {
            "text": val.inputText,
            "cType": classID.toString()
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
    }
    setFetchData(!fetchData)
    setIsCLick(!isCLick)


  }
  // useEffect(() => {
  //   socket.on('chat message', (msg) => {
  //     setToDoData([msg, ...toDoData])
  //   });

  // }, [socket])

  // useEffect(() => {
  //   const getAllData = async () => {
  //     await axios.get(`http://localhost:8000/data/getItem/${classID}`)
  //       .then(function (response) {
  //         // console.log(response.data)
  //         setData(response.data)
  //         if (response.data.error) {
  //           setToDoData([])
  //           setsError(response.data.error)
  //           setErrorState(true)
  //           setTimeout(() => {
  //             setErrorState(false)
  //           }, 1500);
  //         } else {
  //           setToDoData(response.data[0].classData)
  //           // console.log(response.data[0].classData)
  //         }
  //       })
  //       .catch(function (error) {

  //       })
  //       .finally(function () {

  //       });
  //   }
  //   console.log(toDoData)
  //   getAllData()
  // }, [fetchData])


  const handleOpenModal = async () => {
    setOpen(true);

    // await axios.delete(`http://localhost:8000/data/delete/${data[0]._id}`)
    //   .then(function (response) {
    //     console.log(response.data)
    //     setToDoData([])
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //   });
  }
  const clearAll =()=>{
    if(adminPassword === admin){
      console.log("matched ")
      setIfPassNotMatch(false)
    }else{
      console.log("not matched ")
      setIfPassNotMatch(true)
      setTimeout(() => {
        setIfPassNotMatch(false)
      }, 1200);
    }
    
  }
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const adminPass = (val) => {
    setAdminPassword(val)
   };





  return (
    <>
      <Modal
        modalState={open}
        adminPass={adminPass}
        handleClose={handleClose}
        handleSubmit={clearAll}
        ifError={ifPassNotMatch}
      />
      <div className="alert">
        <div className="alert-left">
          {(errorState) ?
            <Danger errorTxt={isError} />
            : null}
        </div>
      </div>
      <header>
        <Nav />
      </header>
      <main>
        <section className="top">
          <Input getClass={getClass}
            getInput={getInput}
            handleOpenModal={handleOpenModal} 
           />
        </section>
        <section className="main-content">
          <ul className="list">
            {toDoData.map((eachToDo, i) => <Post text={eachToDo.text}
              key={i}
            />)
            }
          </ul>
        </section>
      </main>
    </>
  );
};

export default App;
