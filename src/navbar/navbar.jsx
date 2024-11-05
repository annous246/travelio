import "./navbar.css";
import lang from "../assets/us.png";
import fr from "../assets/fr.png";
import logo from "../assets/LOGO ZENITH.png";
import { useContext } from "react";
import { authenticationContext, notificationContext } from "../App";
import axios from "axios";
import Profile from "../profile/profile";
axios.defaults.headers.common["auth"] = localStorage.getItem("token");
axios.defaults.withCredentials = true;
export default function Navbar({ setLoginOpen, setRegisterOpen }) {
  const {
    auth,
    setUpdateHeaders,
    updateHeaders,
    setAuth,
    setPageCount,
    setPageState,
    pageState,
  } = useContext(authenticationContext);
  const setMessage = useContext(notificationContext);
  const { setLanguage } = useContext(authenticationContext);
  function open() {
    setLoginOpen(true);
  }
  function openreg() {
    setRegisterOpen(true);
  }
  function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    setLanguage(lang);
  }
  return (
    <header id="header">
      <span id="logo-span">
        <img id="logo-img" src={logo} />
        <h4>Travelio</h4>
      </span>
      <nav id="navbar">
        <ul>
          <li
            onClick={() => {
              localStorage.setItem("pageCount", 0);
              console.log(localStorage.getItem("pageCount") + " change");
              setPageState((prev) => !prev);
            }}
          >
            <span className="expander"></span>
            <a>Home</a>
          </li>
          <li>
            <span className="expander"></span>
            <a>Our Services</a>
          </li>
          <li>
            <span className="expander"></span>
            <a>About Us</a>
          </li>
          <li>
            <span className="expander"></span>
            <a>Contact Us</a>
          </li>
        </ul>
      </nav>
      {auth ? (
        <Profile />
      ) : (
        <>
          <button id="login" onClick={open}>
            Login
          </button>
          <button id="register" onClick={openreg}>
            Register
          </button>
        </>
      )}
      <span onMouseDown={() => changeLanguage("en")} id="language">
        <img src={lang} />
      </span>
      <span onMouseDown={() => changeLanguage("fr")} id="language">
        <img src={fr} />
      </span>
    </header>
  );
}
