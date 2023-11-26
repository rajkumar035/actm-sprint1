import "./index.css";
import { useState } from "react";
import close from "../../assets/svg/close.svg";
import menu from "../../assets/svg/menu.svg";
import { useGoogleAuth } from "../../contexts/GoogleAuthContext";
import { useNavigate } from "react-router-dom";
const logo = require("../../assets/images/logo.webp");

const Header = () => {
  const navigate = useNavigate();

  const [state, setState] = useState(false);

  const handleNavState = () => {
    setState(!state);
  };

  const { currentUser, googleSignIn, googleSignOut } = useGoogleAuth();

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

  return (
    <nav id="header">
      <div className="logo">
        <div className="blur__logo">
          <img height={"100"} width={"100"} className="brand" loading="lazy" src={logo} alt="logo" />
        </div>
        <p>Academy of Clinical Translational Medicine</p>
      </div>
      <input type="checkbox" id="check" onClick={handleNavState} />
      {!state && (
        <label for="check" className="checkbtn">
          <img loading="eager" height={"100"} width={"100"} alt="" src={menu} />
        </label>
      )}
      <ul className="navbar__content__container">
        {state && (
          <label for="check" className="checkbtn">
            <div className="close">
              <img loading="eager" height={"100"} width={"100"} alt="" src={close} />
            </div>
          </label>
        )}
        <div className="navbar__contents">
          <li className="navbar__contents__list">
            <a title="Navigate__Home" className="navbar__contents__value" href="#home">
              Home
            </a>
          </li>
          <li className="navbar__contents__list">
            <a title="Navigate__About" className="navbar__contents__value" href="#about">
              About
            </a>
          </li>
          <li className="navbar__contents__list">
            <a title="Navigate__Events" className="navbar__contents__value" href="#events">
              Events
            </a>
          </li>
          <li className="navbar__contents__list">
            <a title="Navigate__Webinars" className="navbar__contents__value" href="#webinars">
              Webinars
            </a>
          </li>
          <li className="navbar__contents__list">
            <a title="Navigate__Projects" className="navbar__contents__value" href="#projects">
              Projects
            </a>
          </li>
          <li className="navbar__contents__list">
            <a title="Navigate__Offers" className="navbar__contents__value" href="#offers">
              Offers
            </a>
          </li>
          <li className="navbar__contents__list">
            <a title="Navigate__Missions" className="navbar__contents__value" href="#missions">
              Missions
            </a>
          </li>
          {state && (
            <li className="navbar__contents__list">
              {currentUser ? (
                <div className="header__useractions">
                  <button onClick={googleSignOut} className="navbar__contents__value padding-none">
                    Sign Out
                  </button>
                  {currentUser?.userType === "admin" ? (
                    <>
                      <span>|</span>
                      <button
                        className="navbar__contents__value padding-none"
                        onClick={() => {
                          navigate("/admin");
                        }}
                      >
                        Go to
                      </button>
                    </>
                  ) : (
                    <>
                      <span>|</span>
                      <button
                        className="navbar__contents__value padding-none"
                        onClick={() => {
                          navigate("/user");
                        }}
                      >
                        Go to
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="navbar__contents__value padding-none" onClick={googleSignIn}>
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
                    <button onClick={googleSignOut} className="navbar__contents__value padding-none">
                      Sign Out
                    </button>
                    {currentUser?.userType === "admin" ? (
                      <>
                        <span>|</span>
                        <button
                          className="navbar__contents__value padding-none"
                          onClick={() => {
                            navigate("/admin");
                          }}
                        >
                          Go to
                        </button>
                      </>
                    ) : (
                      <>
                        <span>|</span>
                        <button
                          className="navbar__contents__value padding-none"
                          onClick={() => {
                            navigate("/user");
                          }}
                        >
                          Go to
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="navbar__contents__value padding-none" onClick={googleSignIn}>
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
