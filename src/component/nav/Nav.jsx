import React from "react";
import "./Nav.css";
import ToglleSwitch from "../Switch/ToglleSwitch";
import { useEffect, useState } from "react"




export default function Nav() {
  const [theme, setTheme] = useState(true)
  const [currentTheme, setCurrentTheme] = useState("")
  useEffect(() => {
    setCurrentTheme(localStorage.getItem("theme"));
  }, [])

  const changeTheme = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark")
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setCurrentTheme("light")
      document.documentElement.setAttribute("data-theme", "light");
    }
    setTheme(!theme)
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
        <ToglleSwitch sx={{ m: 2 }} onChange={changeTheme} mytheme={theme.toString()} />
      </div>
    </nav>
  );
}
