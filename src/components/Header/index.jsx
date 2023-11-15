import "./index.css";
import { useState } from "react";
import close from "../../assets/svg/close.svg";
import menu from "../../assets/svg/menu.svg";
import { useGoogleAuth } from "../../contexts/GoogleAuthContext";
import { useNavigate } from "react-router-dom";
const logo = require("../../assets/images/logo.png");

const Header = () => {
  const [state, setState] = useState(false);

  const navigate = useNavigate();

  const handleNavState = () => {
    setState(!state);
  };

  document.addEventListener("scroll", (e) => {
    const getHeader = document.querySelector("#header");
    if (getHeader) {
      if (window.scrollY > 700) {
        getHeader.classList.add("dark__header");
      } else {
        getHeader.classList.remove("dark__header");
      }
    }
  });

  const { currentUser, googleSignIn, googleSignOut } = useGoogleAuth();

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
              {currentUser ? (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={googleSignOut} className="navbar__contents__value">
                    Sign Out
                  </button>
                  {currentUser?.userType === "admin" ? (
                    <>
                      |
                      <button
                        className="navbar__contents__value"
                        onClick={() => {
                          navigate("/admin/home");
                        }}
                      >
                        Go to
                      </button>
                    </>
                  ) : (
                    <>
                      |
                      <button
                        className="navbar__contents__value"
                        onClick={() => {
                          navigate("/user/home");
                        }}
                      >
                        Go to
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="navbar__contents__value" onClick={googleSignIn}>
                  Login with Google
                </div>
              )}
            </li>
          )}
          {!state && (
            <li>
              <div className="header__useractions">
                {currentUser ? (
                  <>
                    <button onClick={googleSignOut} className="navbar__contents__value">
                      Sign Out
                    </button>
                    {currentUser?.userType === "admin" ? (
                      <>
                        |
                        <button
                          className="navbar__contents__value"
                          onClick={() => {
                            navigate("/admin/home");
                          }}
                        >
                          Go to
                        </button>
                      </>
                    ) : (
                      <>
                        |
                        <button
                          className="navbar__contents__value"
                          onClick={() => {
                            navigate("/user/home");
                          }}
                        >
                          Go to
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="navbar__contents__value" onClick={googleSignIn}>
                    Login with Google
                  </div>
                )}
              </div>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Header;
