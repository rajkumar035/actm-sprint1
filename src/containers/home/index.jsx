import React from "react";
import "./index.css";
import instagram from "../../assets/svg/insta.svg";
import linkedIn from "../../assets/svg/linkedin.svg";
import twitter from "../../assets/svg/twitter.svg";
import facebook from "../../assets/svg/facebook.svg";
import { useNavigate } from "react-router-dom";
const logo = require("../../assets/images/logo.png");

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="header">
        <button
          onClick={() => {
            handleNavigation("/webinars");
          }}
        >
          Webinars
        </button>
        <button
          onClick={() => {
            handleNavigation("/about");
          }}
        >
          About
        </button>
        <img alt="logo" src={logo} />
        <button
          onClick={() => {
            handleNavigation("/offers");
          }}
        >
          Offers
        </button>
        <button
          onClick={() => {
            handleNavigation("/events");
          }}
        >
          Events
        </button>
      </nav>
    </>
  );
};

const Home = () => {
  return (
    <section className="homepage">
      <Header />
      <div className="homepage__layout">
        <div className="header__actions">
          <button>login</button>|<button>register</button>
        </div>
        <div className="moraltext">
          <h1>Inspiring Medical Pioneers to Shape the Future of Healthcare </h1>
          <button className="btn--outlined">Join Now</button>
        </div>
        <div className="contact__list">
          <button className="btn--text">
            <img src={twitter} alt="twitter" />
          </button>
          <button className="btn--text">
            <img src={facebook} alt="facebook" />
          </button>
          <button className="btn--text">
            <img src={instagram} alt="instagram" />
          </button>
          <button className="btn--text">
            <img src={linkedIn} alt="linkedIn" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
