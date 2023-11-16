import React, { useEffect, useState } from "react";
import { useGoogleAuth } from "../../contexts/GoogleAuthContext";
import { Box, Container, Grid, Typography } from "@mui/material";
import { getData } from "../../helpers/firebaseHelper";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { currentUser } = useGoogleAuth();
  const [eventData, setEventData] = useState([]);
  const [webinarData, setWebinarData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getData("events")
      .then((res) => {
        setEventData(res);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
        alert("Something went wrong");
      });
    getData("webinars")
      .then((res) => {
        setLoader(false);
        setWebinarData(res);
      })
      .catch(() => {
        setLoader(false);
        alert("Something went wrong");
      });
    getData("projects")
      .then((res) => {
        setLoader(false);
        setProjectData(res);
      })
      .catch(() => {
        setLoader(false);
        alert("Something went wrong");
      });
    setLoader(false);
  }, []);

  return (
    <>
      {loader && <Loader />}
      <Container maxWidth="lg">
        <h2>Hello, {currentUser?.displayName}</h2>
        <Grid container spacing={3} margin={"10px 0px"} justifyContent={"center"}>
          <Grid item={true} lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", padding: "30px", textAlign: "center", borderRadius: "10px", borderRight: "6px solid #3A5199" }}>
              <Typography fontSize={"20px"} color={"rgba(0, 0, 0, 0.5)"} fontWeight={"600"}>
                Events
              </Typography>
              <Typography fontSize={"50px"} fontWeight={"600"} color={"#3A5199"}>
                {eventData.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item={true} lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", padding: "30px", textAlign: "center", borderRadius: "10px", borderRight: "6px solid #3A5199" }}>
              <Typography fontSize={"20px"} color={"rgba(0, 0, 0, 0.5)"} fontWeight={"600"}>
                Webinars
              </Typography>
              <Typography fontSize={"50px"} fontWeight={"600"} color={"#3A5199"}>
                {webinarData?.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item={true} lg={6} md={6} sm={12} xs={12}>
            <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;", padding: "30px", textAlign: "center", borderRadius: "10px", borderRight: "6px solid #3A5199" }}>
              <Typography fontSize={"20px"} fontWeight={"600"} color={"rgba(0, 0, 0, 0.5)"}>
                Projects
              </Typography>
              <Typography fontSize={"50px"} fontWeight={"600"} color={"#3A5199"}>
                {projectData.length}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminDashboard;
