import React from "react";
import "./Nav.css";
import ToglleSwitch from "../Switch/ToglleSwitch";
import { useEffect ,useState } from "react"




export default function Nav() {
  const [theme, setTheme] = useState(true)
  const changeTheme = () => {
    let targetTheme = "light";
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    setTheme(!theme)
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme); 
  }

  const getTheme = () => {
    let storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
    }

  }
  useEffect(() => {
    getTheme()
  }, [])


  return (
    <nav>
      <div className="heading">
        <h1>
          Shared clipboard over the Air - by <span>sysBorg</span>
        </h1>
        <img src="https://sysborg.com/images/sysborg-logo.jpg" alt="" />
        <ToglleSwitch sx={{ m: 2 }} onChange={changeTheme}  mytheme={theme.toString()} />
      </div>
    </nav>
  );
}
