import React from "react";
import "./index.css";
import instagram from "../../assets/svg/insta.svg";
import linkedIn from "../../assets/svg/linkedin.svg";
// import twitter from "../../assets/svg/twitter.svg";
// import facebook from "../../assets/svg/facebook.svg";
// import CssAnimations from "../../utils/animations";
// import { useNavigate } from "react-router-dom";

const Home = ({ id }) => {
  // const navigate = useNavigate();
  // const handleNavigation = (path) => {
  //   navigate(path);
  // };
  // const text = "Inspiring Medical Pioneers to Shape the Future of Healthcare";
  // const myArray = [...text];
  // CssAnimations.typewritingAnimation(".typeText", myArray);

  return (
    <section id={id} className="homepage">
      <div className="homepage__layout">
        <div class="moraltext">
          <h1>
            <span>Inspiring</span> <span>Medical</span> <span>Pioneers</span> <span>to</span> <span>Shape</span> <span>the</span> <span>Future</span> <span>of</span> <span>Healthcare</span>
          </h1>
          <button
            className="btn--outlined"
            // onClick={() => {
            //   handleNavigation("/userregistration");
            // }}
          >
            Join Now
          </button>
        </div>
        <div className="contact__list">
          {/* <a className="btn--text" href="/">
            <img src={twitter} alt="twitter" />
          </a>
          <a className="btn--text" href="/">
            <img src={facebook} alt="facebook" />
          </a> */}
          <a className="btn--text" href="https://instagram.com/theactm.org2410?utm_source=qr">
            <img src={instagram} alt="instagram" />
          </a>
          <a className="btn--text" href="https://www.linkedin.com/company/the-academy-of-clinical-translation-medicine/">
            <img src={linkedIn} alt="linkedIn" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
