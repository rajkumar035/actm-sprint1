import React from "react";
import "./index.css";
import instagram from "../../assets/svg/insta.svg";
import linkedIn from "../../assets/svg/linkedin.svg";
import twitter from "../../assets/svg/twitter.svg";
import facebook from "../../assets/svg/facebook.svg";
import { useNavigate } from "react-router-dom";
import CssAnimations from "../../utils/animations";

const Home = ({ id }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const text = "Inspiring Medical Pioneers to Shape the Future of Healthcare";
  const myArray = [...text];
  CssAnimations.typewritingAnimation(".typeText", myArray);

  return (
    <section id={id} className="homepage">
      <div className="homepage__layout">
        <div class="moraltext">
          <h1 className="typeText">|</h1>
          <button
            className="btn--outlined"
            onClick={() => {
              handleNavigation("/missions");
            }}
          >
            Join Now
          </button>
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
