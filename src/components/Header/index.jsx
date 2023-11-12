import "./index.css";
import { useState } from "react";
import close from "../../assets/svg/close.svg";
import menu from "../../assets/svg/menu.svg";
const logo = require("../../assets/images/logo.png");

const Header = () => {
  const [state, setState] = useState(false);

  const handleNavState = () => {
    setState(!state);
  };

  return (
    <nav id="home">
      <img className="brand" src={logo} alt="logo" />
      <input type="checkbox" id="check" onClick={handleNavState} />
      <label for="check" className="checkbtn">
        <img alt="" src={menu} />
      </label>
      <ul>
        {state && (
          <label for="check" className="checkbtn">
            <div className="close">
              <img alt="" src={close} />
            </div>
          </label>
        )}
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#events">Events</a>
        </li>
        <li>
          <a href="#webinars">Webinars</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#missions">Missions</a>
        </li>
        <li>
          <div className="header__useractions">
            <a href="#login">login</a>|<a href="#register">register</a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
