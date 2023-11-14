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

  document.addEventListener("scroll", (e) => {
    const getHeader = document.querySelector("#header");
    if (window.scrollY > 700) {
      getHeader.classList.add("dark__header");
    } else {
      getHeader.classList.remove("dark__header");
    }
  });

  return (
    <nav id="header">
      <img className="brand" src={logo} alt="logo" />
      <input type="checkbox" id="check" onClick={handleNavState} />
      {!state && (
        <label for="check" className="checkbtn">
          <img alt="" src={menu} />
        </label>
      )}
      <ul className="navbar__content__container">
        {state && (
          <label for="check" className="checkbtn">
            <div className="close">
              <img alt="" src={close} />
            </div>
          </label>
        )}
        <div className="navbar__contents">
          <li className="navbar__contents__list">
            <a className="navbar__contents__value" href="#home">
              Home
            </a>
          </li>
          <li className="navbar__contents__list">
            <a className="navbar__contents__value" href="#about">
              About
            </a>
          </li>
          <li className="navbar__contents__list">
            <a className="navbar__contents__value" href="#events">
              Events
            </a>
          </li>
          <li className="navbar__contents__list">
            <a className="navbar__contents__value" href="#webinars">
              Webinars
            </a>
          </li>
          <li className="navbar__contents__list">
            <a className="navbar__contents__value" href="#projects">
              Projects
            </a>
          </li>
          <li className="navbar__contents__list">
            <a className="navbar__contents__value" href="#offers">
              Offers
            </a>
          </li>
          <li className="navbar__contents__list">
            <a className="navbar__contents__value" href="#missions">
              Missions
            </a>
          </li>
          {state && (
            <li className="navbar__contents__list">
              <a className="navbar__contents__value" href="#missions">
                Login
              </a>
            </li>
          )}
          {state && (
            <li className="navbar__contents__list">
              <a className="navbar__contents__value" href="#missions">
                Register
              </a>
            </li>
          )}
          {!state && (
            <li>
              <div className="header__useractions">
                <a className="navbar__contents__value" href="#login">
                  login
                </a>
                |
                <a className="navbar__contents__value" href="#register">
                  register
                </a>
              </div>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Header;
