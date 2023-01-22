import React from "react";
import "./Nav.css";
import ToglleSwitch from "../Switch/ToglleSwitch";
import { useEffect, useState } from "react"
import { GlobalContext } from '../../Context/context';
import { useContext } from "react";





export default function Nav() {
  const [currentTheme, setCurrentTheme] = useState("")
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentTheme(localStorage.getItem("theme"));
    const theme = () =>{
      let myTheame = localStorage.getItem("theme");
      document.documentElement.setAttribute("data-theme", myTheame);
     }
     theme()
     // eslint-disable-next-line
  }, [])

  const changeTheme = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark")
      localStorage.setItem("theme","dark")
      document.documentElement.setAttribute("data-theme", "dark");
      dispatch({
        type: "CHANGE_THEME",
        payload:"dark"
      })
    } else {
      localStorage.setItem("theme","light")
      setCurrentTheme("light")
      document.documentElement.setAttribute("data-theme", "light");
      dispatch({
        type: "CHANGE_THEME",
        payload:"light"
      })
    }
   
   console.log(state.Theme)
  }

  // const getTheme = () => {
  //   let storedTheme = localStorage.getItem("theme");
  //   if (storedTheme) {
  //     document.documentElement.setAttribute("data-theme", storedTheme);
  //   }
  // }
  // useEffect(() => {
  //   getTheme()
  // }, [])

  return (
    <nav>
      <div className="heading">
        <h1>
          Shared clipboard over the Air - by <span>sysBorg</span>
        </h1>
        <img src="https://sysborg.com/images/sysborg-logo.jpg" alt="" />
        <ToglleSwitch sx={{ m: 2 }} onChange={changeTheme} mytheme={state.Theme} />
      </div>
    </nav>
  );
}
