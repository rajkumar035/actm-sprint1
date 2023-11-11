import React from "react";
import "./index.css";
import StoryPic from "../../assets/images/storypic.png";

const Story = () => {
  return (
    <section className="story">
      <div className="storycontainer">
        <h6>Our Story</h6>
        <p>We believe in the trans-formative power of passion, knowledge, and collaboration. We are not just an organization, we are a movement of medical students, professionals, and experts united by a common vision - to redefine healthcare excellence. Here, we build a community that threads through all the domains of healthcare and observe the incantation that this nexus would bring forth</p>
      </div>
      <img src={StoryPic} className="aboutContainer__image" alt="who" />
      <div className="aboutcontainer">
        <div className="aboutContent">
          <h6>Who are we ?</h6>
          <div className="divider" />
          <p>We are the change agents, innovators of tomorrow in the realm of health care. Our purpose is to mentor and inspire the next generation of medical pioneers, by equipping them with the essential resources, knowledge, and networks to shape a healthier world. As a collective of like-minded individuals, our shared aspiration is to weave together dispersed communities of medical students, doctors, and healthcare professionals worldwide, fostering a tapestry of collaboration for a brighter healthcare future.</p>
        </div>
        <img className="aboutImage" alt="aboutImage" src={StoryPic} />
      </div>
    </section>
  );
};

export default Story;
