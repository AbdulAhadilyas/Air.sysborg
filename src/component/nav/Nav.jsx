import React from "react";
import "./Nav.css";
import ToglleSwitch from "../Switch/ToglleSwitch";
import { useEffect, useState } from "react";
import { GlobalContext } from "../../Context/context";
import { useContext } from "react";

export default function Nav() {
  const [currentTheme, setCurrentTheme] = useState("");
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentTheme(localStorage.getItem("theme"));
    const theme = () => {
      let myTheame = localStorage.getItem("theme");
      document.documentElement.setAttribute("data-theme", myTheame);
    };
    theme();
    // eslint-disable-next-line
  }, []);

  const changeTheme = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      dispatch({
        type: "CHANGE_THEME",
        payload: "dark",
      });
    } else {
      localStorage.setItem("theme", "light");
      setCurrentTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
      dispatch({
        type: "CHANGE_THEME",
        payload: "light",
      });
    }

    console.log(state.Theme);
  };

  return (
    <nav>
      <div className="heading">
        <h1>
          Shared clipboard over the Air - by <span>sysBorg</span>
        </h1>
        <img src="https://sysborg.com/images/sysborg-logo.jpg" alt="" />

        <div className="nav-top-right">
        <ToglleSwitch
          sx={{ m: 2 }}
          onChange={changeTheme}
          mytheme={state.Theme}
        />
        <a href="https://github.com/AbdulAhadilyas" target="_blank"  rel="noreferrer">
        <svg
        fill={"white"}
          height="32"
          aria-hidden="true"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          data-view-component="true"
          className="octicon octicon-mark-github v-align-middle"
        >
          <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
        </a>
        </div>
      </div>
    </nav>
  );
}
