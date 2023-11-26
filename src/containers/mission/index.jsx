import React from "react";
import "./index.css";
import left from "../../assets/svg/apostrophe.svg";
import Grid from "@mui/material/Grid";
import brand from "../../assets/images/brand.webp";
import CssAnimations from "../../utils/animations";
const map = require("../../assets/images/map.webp");

const Mission = ({ id }) => {
  const mission = ["More than a resource, we're your steadfast support. Equipping medical students with tools and confidence, we facilitate their plunge into research projects, assuring a safety net of expertise beneath them.", "In a world where change happens through connections, we are your bridge. We unite diverse minds across healthcare disciplines, cultivating an environment where innovation flourishes", "Our webinars and podcasts aren't just informative; they're captivating journeys into the minds of healthcare's trailblazers. Gain insights, challenge conventions, and fuel your own innovative spark", "Our prestigious conferences aren't mere gatherings; they're global platforms for showcasing brilliance. Here, we celebrate innovation and drive change that resonates far beyond the event"];
  return (
    <section id={id} className="missionvission">
      <div className="missioncontainer">
        <div className="missioncontainer__header">
          <h5>Our Missions</h5>
          <div className="divider" />
          <p>At ACTM, we are on a mission that ignites curiosity, fuels ambition, and sparks collaboration within the medical community</p>
        </div>
        <div className="missioncontainer__content__holder">
          <Grid container spacing={1}>
            {mission?.map((items, index) => {
              return (
                <Grid item={true} key={index} lg={6} md={6} xs={12}>
                  <div
                    id={`mouseHover-${index}`}
                    onMouseOut={() => {
                      CssAnimations.mouseOutTextInVicible(`#mouseHover-${index}`);
                    }}
                    onMouseMove={() => {
                      CssAnimations.mouseOverTextVisible(`#mouseHover-${index}`);
                    }}
                    className="missioncontainer__content mouseHover"
                  >
                    <div>
                      <img loading="lazy" height={"33"} width={"33"} src={left} alt="" />
                    </div>
                    <h6>{items}</h6>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
      <Grid container spacing={3} className="vissioncontainer" component={"div"}>
        <Grid item={true} lg={6} md={6} xs={12} component={"h6"}>
          Your journey towards impactful research and a brighter healthcare future starts here. Join us, and together, let's shape a healthier world.
        </Grid>
        <Grid item={true} lg={6} md={6} xs={12}>
          <div className="vissioncontact">
            <div>
              <h6>Email</h6>
              <p>theactm.org@gmail.com</p>
            </div>
            <div>
              <h6>Head Quarters</h6>
              <p>Mumbai, India</p>
            </div>
            <a title="Location__Map" href="https://www.bing.com/maps?where=Mumbai%2C%20IN">
              <img height={"100%"} width={"100%"} loading="lazy" alt="map" src={map} />
            </a>
          </div>
        </Grid>
      </Grid>
      <footer className="footercontainer">
        <div>
          <h6>Designed and Developed by</h6>
          <a title="Creator" href="https://vdev.netlify.app/">
            <img alt="creator" height={"20"} loading="eager" width={"100"} src={brand} />
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Mission;
