import React, { useEffect, useState } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import AppPagination from "../../components/Pagination";
import nodata from "../../assets/images/nodata.webp";
import { getData } from "../../helpers/firebaseHelper";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const ProjectCard = (props) => {
  const { projectImage, projectName, projectDescription, projectLink } = props;
  return (
    <Box component={"div"} className="project__Cards">
      <img height={"460px"} width={"100"} loading="lazy" src={projectImage} alt={projectImage} />
      <div className="project__Content__Overlay">
        <h6>{projectName}</h6>
        <p>{projectDescription}</p>
        <button
          className="btn--outlined project__btn"
          onClick={() => {
            window.location.href = projectLink;
          }}
        >
          Learn More
        </button>
      </div>
    </Box>
  );
};

const Projects = ({ id }) => {
  const [projectData, setprojectData] = useState({
    "Not Started": [],
    InProgess: [],
    Completed: [],
  });
  const [currentPage, setCurrentPage] = useState({
    "Not Started": 1,
    InProgess: 1,
    Completed: 1,
  });

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const projectsPerPage = isMobileScreen ? 1 : 3;
  const noDatas = projectData["Not Started"].length === 0 && projectData.InProgess.length === 0 && projectData.Completed.length === 0;

  useEffect(() => {
    getData("projects")
      .then((res) => {
        const getNotCompletedData = res?.filter((items) => {
          return items?.projectStatus === "Not Started";
        });
        const getProgressData = res?.filter((items) => {
          return items?.projectStatus === "InProgress";
        });
        const getCompletedData = res?.filter((items) => {
          return items?.projectStatus === "Completed";
        });
        setprojectData({
          "Not Started": getNotCompletedData,
          InProgess: getProgressData,
          Completed: getCompletedData,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const indexofLastNotCompletedData = currentPage["Not Started"] * projectsPerPage;
  const indexOfFirstNotCompletedData = indexofLastNotCompletedData - projectsPerPage;
  const currentNotCompletedProjects = projectData["Not Started"].slice(indexOfFirstNotCompletedData, indexofLastNotCompletedData) || [];

  const indexofInProgressData = currentPage.InProgess * projectsPerPage;
  const indexOfInProgressData = indexofInProgressData - projectsPerPage;
  const currentInProgresProjects = projectData["InProgess"].slice(indexOfInProgressData, indexofInProgressData) || [];

  const indexofCompletedData = currentPage.Completed * projectsPerPage;
  const indexOfFirstCompletedData = indexofCompletedData - projectsPerPage;
  const currentCompletedProjects = projectData["Completed"].slice(indexOfFirstCompletedData, indexofCompletedData) || [];

  const handlePageChange = (event, value, key) => {
    setCurrentPage((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section id={id} className="projectscontainer">
      <div className="projectsContainer__header">
        <h6>All Projects</h6>
        <div className="divider" />
      </div>
      <div className="projectContainer__Subsections">
        {noDatas ? (
          <div className="nodata__Image__Align">
            <img alt="nodata" height={"100"} width={"100"} loading="lazy" src={nodata} className="nodata__image " />
          </div>
        ) : (
          <>
            {projectData["Not Started"]?.length > 0 && (
              <>
                <h6>Upcomings</h6>
                <div className="projectsContainer_cards">
                  <Grid container spacing={4} justifyContent={"center"} flexGrow={1} alignItems={"stretch"}>
                    {currentNotCompletedProjects.map((items, index) => {
                      return (
                        <Grid item={true} key={index} lg={4} md={6} sm={12} xs={12}>
                          <ProjectCard {...items} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
                <AppPagination
                  count={projectsPerPage}
                  data={projectData["Not Started"]}
                  currentindex={currentPage["Not Started"]}
                  handlePageChange={(e, v) => {
                    handlePageChange(e, v, "Not Started");
                  }}
                />
              </>
            )}
            {projectData["InProgess"]?.length > 0 && (
              <>
                <div className="content__divider" />
                <h6>In Progress</h6>
                <div className="projectsContainer_cards">
                  <Grid container spacing={4} justifyContent={"center"} flexGrow={1} alignItems={"stretch"}>
                    {currentInProgresProjects.map((items, index) => {
                      return (
                        <Grid item={true} key={index} lg={4} md={6} sm={12} xs={12}>
                          <ProjectCard {...items} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
                <AppPagination
                  count={projectsPerPage}
                  data={projectData.InProgess}
                  currentindex={currentPage.InProgess}
                  handlePageChange={(e, v) => {
                    handlePageChange(e, v, "InProgess");
                  }}
                />
              </>
            )}
            {projectData["Completed"]?.length > 0 && (
              <>
                <div className="content__divider" />
                <h6>Completed</h6>
                <div className="projectsContainer_cards">
                  <Grid container spacing={4} justifyContent={"center"} flexGrow={1} alignItems={"stretch"}>
                    {currentCompletedProjects.map((items, index) => {
                      return (
                        <Grid item={true} key={index} lg={4} md={6} sm={12} xs={12}>
                          <ProjectCard {...items} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
                <AppPagination
                  count={projectsPerPage}
                  data={projectData.Completed}
                  currentindex={currentPage.Completed}
                  handlePageChange={(e, v) => {
                    handlePageChange(e, v, "Completed");
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
