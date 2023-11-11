import React from "react";
import "./index.css";
import instagram from "../../assets/svg/insta.svg";
import linkedIn from "../../assets/svg/linkedin.svg";
import twitter from "../../assets/svg/twitter.svg";
import facebook from "../../assets/svg/facebook.svg";
const logo = require("../../assets/images/logo.png");

const Header = () => {
  return (
    <nav className="header">
      <button>Webinars</button>
      <button>About</button>
      <img alt="logo" src={logo} />
      <button>Offers</button>
      <button>Events</button>
      <div className="header__actions">
        <div>
          <button>login</button>|<button>register</button>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <section className="homepage">
      <Header />
      <div className="homepage__layout">
        <div className="moraltext">
          <h1>Inspiring Medical Pioneers to Shape the Future of Healthcare </h1>
          <button className="btn--outlined">Join Now</button>
        </div>
        <div className="contact__list">
          <button className="btn--text">
            <img src={linkedIn} alt="linkedIn" />
          </button>
          <button className="btn--text">
            <img src={twitter} alt="twitter" />
          </button>
          <button className="btn--text">
            <img src={facebook} alt="facebook" />
          </button>
          <button className="btn--text">
            <img src={instagram} alt="instagram" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
