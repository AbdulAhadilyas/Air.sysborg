import Nav from "./component/nav/Nav";
import "./App.css";
import Input from "./component/inputs and button/Input";
import Post from "./component/post/Post";
import axios from 'axios';
import { useState, useEffect } from "react";
import io from 'socket.io-client';
import Danger from "./component/Alert/Danger";
export const App = () => {

  const socket = io.connect("http://localhost:8000", { transports: ['websocket'] });
  const [toDoData, setToDoData] = useState([]);
  const [data, setData] = useState([]);
  const [classID, setClassID] = useState("");
  const [isCLick, setIsCLick] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [isError, setsError] = useState(false);


  useEffect(() => {
    socket.on('connection', () => {
      console.log("connected")
    });
  }, [])

  useEffect(() => {
    socket.on("getData", (data) => {
      console.log("socketData", data)
    })
  }, [socket])

  const getClass = async (val) => {
    setClassID(val.classId)
    await axios.get(`http://localhost:8000/data/getItem/${val.classId}`)
      .then(function (response) {
        console.log(response.data)
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
          console.log(response.data);

        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {

        });
    }
    setIsCLick(!isCLick)
  }
  useEffect( () => {
    const getAllData = async () =>{

    await axios.get(`http://localhost:8000/data/getItem/${classID}`)
      .then(function (response) {
        console.log(response.data)
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
    getAllData()
  }, [isCLick])

  console.log(toDoData)
  return (
    <>
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
            getInput={getInput} />
        </section>
        <section className="main-content">
          <ul className="list">
            {toDoData.map((eachToDo, i) => <Post text={eachToDo.text} 
            time={eachToDo.createOn  }
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
