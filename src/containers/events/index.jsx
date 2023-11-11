import React from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import sample from "../../assets/images/sample.png";
import locationico from "../../assets/svg/location.svg";
import timeico from "../../assets/svg/time.svg";
import dateico from "../../assets/svg/date.svg";
import { Pagination } from "@mui/material";

const EventCard = (props) => {
  const { img, header, location, time, date, description } = props;
  return (
    <div className="eventcard">
      <img alt={header} src={img} />
      <div className="eventcard__content">
        <h6>{header}</h6>
        <div className="dividerv2" />
        <div className="eventcard_specifications">
          <div>
            <img alt="location" src={locationico} />
            <h6>{location}</h6>
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
        <div className="eventcard_description">{description}</div>
        <button>Learn More</button>
      </div>
    </div>
  );
};

const Events = () => {
  const boiler = [
    {
      id: 1,
      img: sample,
      header: "Myocardial and pericardia disease meeting",
      location: "Virtually",
      time: "20:30 - 21:30 IST",
      date: "06, November 2023",
      description: "Improving diagnosis and treatment of heart muscle and pericardial disease. Promoting understanding of these disorders among cardiologists.",
    },
    {
      id: 1,
      img: sample,
      header: "Myocardial and pericardia disease meeting",
      location: "Virtually",
      time: "20:30 - 21:30 IST",
      date: "06, November 2023",
      description: "Improving diagnosis and treatment of heart muscle and pericardial disease. Promoting understanding of these disorders among cardiologists.",
    },
    {
      id: 1,
      img: sample,
      header: "Myocardial and pericardia disease meeting",
      location: "Virtually",
      time: "20:30 - 21:30 IST",
      date: "06, November 2023",
      description: "Improving diagnosis and treatment of heart muscle and pericardial disease. Promoting understanding of these disorders among cardiologists.",
    },
    {
      id: 1,
      img: sample,
      header: "Myocardial and pericardia disease meeting",
      location: "Virtually",
      time: "20:30 - 21:30 IST",
      date: "06, November 2023",
      description: "Improving diagnosis and treatment of heart muscle and pericardial disease. Promoting understanding of these disorders among cardiologists.",
    },
  ];
  return (
    <section className="eventscontainer">
      <div className="eventsContainer__header">
        <h6>All Events</h6>
        <div className="divider" />
        <p>Compete in symposiums and contests that celebrate innovation and excellence. Win accolades that will bolster your career and open doors to new opportunities</p>
      </div>
      <div className="eventsContainer_cards">
        <Grid container spacing={6}>
          {boiler.map((items, index) => {
            return (
              <Grid item={true} key={index} lg={4} md={6} xs={12}>
                <EventCard {...items} />
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

export default Events;
