import React, { useEffect, useState } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import locationico from "../../assets/svg/location.svg";
import timeico from "../../assets/svg/time.svg";
import dateico from "../../assets/svg/date.svg";
import AppPagination from "../../components/Pagination";
import nodata from "../../assets/images/nodata.jpg";
import { getData } from "../../helpers/firebaseHelper";
import { useMediaQuery, useTheme } from "@mui/material";

const EventCard = (props) => {
  const { eventImage, eventName, eventLocation, eventEndtime, eventStarttime, eventDate, eventCTA, eventDescription } = props;
  return (
    <div className="eventcard">
      <img alt={eventName} src={eventImage} />
      <div className="eventcard__content">
        <h6>{eventName}</h6>
        <div className="dividerv2" />
        <div className="eventcard_specifications">
          <div>
            <img loading="lazy" alt="location" src={locationico} />
            <h6>{eventLocation}</h6>
          </div>
          <div>
            <img alt="time" src={timeico} />
            <h6>{eventStarttime + "-" + eventEndtime}</h6>
          </div>
          <div>
            <img alt="date" src={dateico} />
            <h6>{eventDate}</h6>
          </div>
        </div>
        <div className="eventcard_description">{eventDescription}</div>
        <button
          onClick={() => {
            window.location.href = eventCTA;
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

const Events = ({ id }) => {
  const [eventData, setEventData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const eventsPerPage = isExtraSmallScreen ? 1 : 3;

  useEffect(() => {
    getData("events")
      .then((res) => {
        setEventData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventData.slice(indexOfFirstEvent, indexOfLastEvent) || [];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <section id={id} className="eventscontainer">
      <div className="eventsContainer__header">
        <h6>All Events</h6>
        <div className="divider" />
        <p>Compete in symposiums and contests that celebrate innovation and excellence. Win accolades that will bolster your career and open doors to new opportunities</p>
      </div>
      <div className="eventsContainer_cards">
        {currentEvents.length === 0 ? (
          <img alt="nodata" src={nodata} className="nodata__image " />
        ) : (
          <Grid container spacing={6} justifyContent={"center"} flexGrow={1} alignItems={"stretch"}>
            {currentEvents.map((items, index) => (
              <Grid item key={index} lg={4} md={6} xs={12}>
                <EventCard {...items} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <AppPagination count={eventsPerPage} data={eventData} currentindex={currentPage} handlePageChange={handlePageChange} />
    </section>
  );
};

export default Events;
