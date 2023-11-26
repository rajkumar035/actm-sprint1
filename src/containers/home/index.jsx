import React from "react";
import "./index.css";
import instagram from "../../assets/svg/insta.svg";
import linkedIn from "../../assets/svg/linkedin.svg";
import homebg from "../../assets/images/homebg.png";

const Home = ({ id }) => {
  return (
    <section id={id} className="homepage">
      <div className="blur__load_home">
        <img height={"100"} width={"100"} loading="lazy" className="homepage__img" src={homebg} alt="bg" />
      </div>
      <div className="homepage__layout">
        <div class="moraltext">
          <h1>
            <span>Inspiring</span> <span>Medical</span> <span>Pioneers</span> <span>to</span> <span>Shape</span> <span>the</span> <span>Future</span> <span>of</span> <span>Healthcare</span>
          </h1>
          <button className="btn--outlined">Join Now</button>
        </div>
        <div className="contact__list">
          <a title="Instagram__Contact" className="btn--text" href="https://instagram.com/theactm.org2410?utm_source=qr">
            <img height={"22"} width={"22"} loading="eager" src={instagram} alt="instagram" />
          </a>
          <a title="LinkedIn__Contact" className="btn--text" href="https://www.linkedin.com/company/the-academy-of-clinical-translation-medicine/">
            <img height={"22"} width={"22"} loading="eager" src={linkedIn} alt="linkedIn" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
