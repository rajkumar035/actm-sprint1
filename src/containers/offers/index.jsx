import React, { useEffect } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import research from "../../assets/svg/research.svg";
import connection from "../../assets/svg/connections.svg";
import webinars from "../../assets/svg/webinars.svg";
import conference from "../../assets/svg/conference.svg";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CssAnimations from "../../utils/animations";

const OfferCard = (props) => {
  const { icon, header, content } = props;
  return (
    <div className="offerCard">
      <div className="offerCard__icon">
        <img src={icon} alt={header} />
      </div>
      <div className="offerCard__content">
        <h6>{header}</h6>
        <p>{content}</p>
      </div>
      {/* <button>Learn More</button> */}
    </div>
  );
};

const Offers = ({ id }) => {
  const contents = [
    {
      icon: research,
      header: "Research Guidance",
      content: "Navigate the world of medical research with confidence",
    },
    {
      icon: connection,
      header: "Global Connections",
      content: "Connect with like-minded professionals from diverse healthcare streams ",
    },
    {
      icon: webinars,
      header: "Inspiring Webinars and Podcasts",
      content: "Learn from eminent doctors and thought leaders",
    },
    {
      icon: conference,
      header: "Prestigious Conferences",
      content: "Showcase your work on a global stage",
    },
  ];
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const currentScreenHeight = window.innerHeight;
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      CssAnimations.textAppearOnScrollMethod(e, ".revealhorizontal", 200, "revealhorizontalShow");
    });
    return () => {
      window.removeEventListener("scroll", (e) => {
        CssAnimations.textAppearOnScrollMethod(e, ".revealhorizontal", 200, "revealhorizontalShow");
      });
    };
  }, [currentScreenHeight]);

  return (
    <section id={id} className="offercontainer">
      <div className="offercontainer__header">
        <h5>What we Offer ?</h5>
        <p>We offer transformative mentorship, uniting healthcare visionaries and providing the resources and networks needed to shape a healthier world.</p>
      </div>
      <div className="offercardcontainer__cards">
        <Grid container spacing={isMobileScreen ? 4 : 5} justifyContent={"center"} alignItems={"stretch"}>
          {contents.map((items, index) => {
            return (
              <Grid item={true} className="revealhorizontal" key={index} lg={3} md={4} sm={6} xs={12}>
                <OfferCard {...items} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default Offers;
