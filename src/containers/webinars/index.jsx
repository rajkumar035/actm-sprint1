import React, { useEffect, useState } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import speakerico from "../../assets/svg/speaker.svg";
import timeico from "../../assets/svg/timeblack.svg";
import dateico from "../../assets/svg/dateblack.svg";
import AppPagination from "../../components/Pagination";
import nodata from "../../assets/images/nodata.jpg";
import { getData } from "../../helpers/firebaseHelper";
import { useMediaQuery, useTheme } from "@mui/material";

const WebinarCard = (props) => {
  const { webinarImage, webinarHeader, webinarRegisterLink, webinarSpeaker, webinarStarttime, webinarEndtime, webinarDate, webinarDescription } = props;
  return (
    <div className="webinarcard">
      <img alt={webinarHeader} src={webinarImage} />
      <div className="webinarcard__content">
        <h6>{webinarHeader}</h6>
        <div className="divider" />
        <div className="webinarcard_description">{webinarDescription}</div>
        <div className="webinarcard_specifications">
          <div>
            <img alt="speaker" src={speakerico} />
            <h6>{webinarSpeaker}</h6>
          </div>
          <div>
            <img alt="time" src={timeico} />
            <h6>{webinarEndtime + "-" + webinarStarttime}</h6>
          </div>
          <div>
            <img alt="date" src={dateico} />
            <h6>{webinarDate}</h6>
          </div>
        </div>
        <button
          className="webinarcard__register"
          onClick={() => {
            window.location.href = webinarRegisterLink;
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

const Webinars = ({ id }) => {
  const [webinarData, setWebinarData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const webinarsPerPage = isMobileScreen ? 1 : 2;

  useEffect(() => {
    getData("webinars")
      .then((res) => {
        setWebinarData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const indexOfLastData = currentPage * webinarsPerPage;
  const indexOfFirstData = indexOfLastData - webinarsPerPage;
  const curretnWebinar = webinarData.slice(indexOfFirstData, indexOfLastData) || [];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <section id={id} className="webinarContainer">
      <div className="webinarContainer__header">
        <h6>All Webinars</h6>
        <div className="divider" />
        <p>Our webinars offer a front-row seat to discussions on cutting-edge medical breakthroughs, emerging trends, and thought-provoking ideas that will challenge your perspective</p>
      </div>
      <div className="webinarContainer_cards">
        <Grid container spacing={6} justifyContent={"center"} flexGrow={1} alignItems={"stretch"}>
          {curretnWebinar.length === 0 ? (
            <img alt="nodata" src={nodata} className="nodata__image " />
          ) : (
            curretnWebinar.map((items, index) => {
              return (
                <Grid item={true} key={index} lg={6} md={6} xs={12}>
                  <WebinarCard {...items} />
                </Grid>
              );
            })
          )}
        </Grid>
      </div>
      <AppPagination count={webinarsPerPage} data={webinarData} currentindex={currentPage} handlePageChange={handlePageChange} />
    </section>
  );
};

export default Webinars;
