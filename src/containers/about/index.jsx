import React, { useEffect } from "react";
import "./index.css";
import StoryPic from "../../assets/images/storypicbanner.webp";
import CssAnimations from "../../utils/animations";

const Story = ({ id }) => {
  const currentScreenHeight = window.innerHeight;
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      CssAnimations.textAppearOnScrollMethod(e, ".revealOnScroll", 200, "revealOnScroll__active");
    });
    return () => {
      window.removeEventListener("scroll", (e) => {
        CssAnimations.textAppearOnScrollMethod(e, ".revealOnScroll", 200, "revealOnScroll__active");
      });
    };
  }, [currentScreenHeight]);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      CssAnimations.textAppearOnScrollMethod(e, ".reveal", 200, "revealShow");
    });
    return () => {
      window.removeEventListener("scroll", (e) => {
        CssAnimations.textAppearOnScrollMethod(e, ".reveal", 200, "revealShow");
      });
    };
  }, [currentScreenHeight]);
  return (
    <section id={id} className="story">
      <div className="storycontainer">
        <div className="storycontainer__overlay revealOnScroll">
          <h6>Our Story</h6>
          <p>We believe in the trans-formative power of passion, knowledge, and collaboration. We are not just an organization, we are a movement of medical students, professionals, and experts united by a common vision - to redefine healthcare excellence. Here, we build a community that threads through all the domains of healthcare and observe the incantation that this nexus would bring forth</p>
        </div>
      </div>
      <div className="blur-load-banner">
        <img height={"100"} width={"100"} loading="lazy" src={StoryPic} className="aboutContainer__image" alt="who" />
      </div>
      <div className="aboutcontainer">
        <div className="aboutContent">
          <h6>Who are we ?</h6>
          <div className="divider" />
          <p className="reveal">We are the change agents, innovators of tomorrow in the realm of health care. Our purpose is to mentor and inspire the next generation of medical pioneers, by equipping them with the essential resources, knowledge, and networks to shape a healthier world. As a collective of like-minded individuals, our shared aspiration is to weave together dispersed communities of medical students, doctors, and healthcare professionals worldwide, fostering a tapestry of collaboration for a brighter healthcare future.</p>
        </div>
        <div className="blur-load">
          <img height={"100"} width={"100"} loading="lazy" className="aboutImage" alt="aboutImage" src={StoryPic} />
        </div>
      </div>
    </section>
  );
};

export default Story;
