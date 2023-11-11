import React from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import sample from "../../assets/images/sample.png";
import speakerico from "../../assets/svg/speaker.svg";
import timeico from "../../assets/svg/timeblack.svg";
import dateico from "../../assets/svg/dateblack.svg";
import { Pagination } from "@mui/material";

const WebinarCard = (props) => {
  const { img, header, speaker, time, date, description } = props;
  const stringLimit = 130;
  const isDescriptionOverflow = description?.length > stringLimit;
  const customDescription = isDescriptionOverflow ? `${description.slice(0, stringLimit)} ` : description;

  return (
    <div className="webinarcard">
      <img alt={header} src={img} />
      <div className="webinarcard__content">
        <h6>{header}</h6>
        <div className="divider" />
        {isDescriptionOverflow ? (
          <div className="webinarcard_description">
            {customDescription}
            <button className="btn--link">more...</button>
          </div>
        ) : (
          <div className="webinarcard_description">{description}</div>
        )}
        <div className="webinarcard_specifications">
          <div>
            <img alt="speaker" src={speakerico} />
            <h6>{speaker}</h6>
          </div>
          <div>
            <img alt="time" src={timeico} />
            <h6>{time}</h6>
          </div>
          <div>
            <img alt="date" src={dateico} />
            <h6>{date}</h6>
          </div>
        </div>
        <button>Learn More</button>
      </div>
    </div>
  );
};

const Webinars = () => {
  const boiler = [
    {
      id: 1,
      img: sample,
      header: "Myocardial and pericardia disease meeting",
      speaker: "Dr. Stephen pry david loki stark",
      time: "20:30 - 21:30 IST",
      date: "06, November 2023",
      description: "Improving diagnosis and treatment of heart muscle and pericardial disease. Promoting understanding of these disorders among cardiologists.",
    },
    {
      id: 1,
      img: sample,
      header: "Myocardial and pericardia disease meeting",
      speaker: "Dr. Stephen pry",
      time: "20:30 - 21:30 IST",
      date: "06, November 2023",
      description: "Improving diagnosis and treatment of heart muscle and pericardial disease. Promoting understanding of these disorders among cardiologists.",
    },
    {
      id: 1,
      img: sample,
      header: "Myocardial and pericardia disease meeting",
      speaker: "Dr. Stephen pry",
      time: "20:30 - 21:30 IST",
      date: "06, November 2023",
      description: "Improving diagnosis and treatment of heart muscle and pericardial disease. Promoting understanding of these disorders among cardiologists.",
    },
    {
      id: 1,
      img: sample,
      header: "Myocardial and pericardia disease meeting",
      speaker: "Dr. Stephen pry",
      time: "20:30 - 21:30 IST",
      date: "06, November 2023",
      description: "Improving diagnosis and treatment of heart muscle and pericardial disease. Promoting understanding of these disorders among cardiologists.",
    },
  ];
  return (
    <section className="webinarContainer">
      <div className="webinarContainer__header">
        <h6>All Webinars</h6>
        <div className="divider" />
        <p>Our webinars offer a front-row seat to discussions on cutting-edge medical breakthroughs, emerging trends, and thought-provoking ideas that will challenge your perspective</p>
      </div>
      <div className="webinarContainer_cards">
        <Grid container spacing={6} display={"flex"} justifyContent={"center"} flexGrow={1} alignItems={"stretch"}>
          {boiler.map((items, index) => {
            return (
              <Grid item={true} key={index} lg={6} md={6} xs={12}>
                <WebinarCard {...items} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="pagination">
        <Pagination color="secondary" count={10} sx={{ color: "#8cad78" }} />
      </div>
    </section>
  );
};

export default Webinars;
