import React, { useEffect, useState } from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import AppPagination from "../../components/Pagination";
import nodata from "../../assets/images/nodata.jpg";
import { getData } from "../../helpers/firebaseHelper";
import { Box } from "@mui/material";

const ProjectCard = (props) => {
  const { projectImage, projectName, projectDescription, projectLink } = props;
  return (
    <Box component={"div"} className="project__Cards">
      <img src={projectImage} alt={projectImage} />
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
  const [projectData, setprojectData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  useEffect(() => {
    getData("projects")
      .then((res) => {
        setprojectData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const indexOfLastData = currentPage * projectsPerPage;
  const indexOfFirstData = indexOfLastData - projectsPerPage;
  const curretnWebinar = projectData.slice(indexOfFirstData, indexOfLastData) || [];

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <section id={id} className="projectscontainer">
      <div className="projectsContainer__header">
        <h6>All Projects</h6>
        <div className="divider" />
      </div>
      <div className="projectsContainer_cards">
        <Grid container spacing={4}>
          {curretnWebinar.length === 0 ? (
            <img alt="nodata" src={nodata} className="nodata__image " />
          ) : (
            curretnWebinar.map((items, index) => {
              return (
                <Grid item={true} key={index} lg={4} md={4} sm={12} xs={12}>
                  <ProjectCard {...items} />
                </Grid>
              );
            })
          )}
        </Grid>
      </div>
      <AppPagination count={projectsPerPage} data={projectData} currentindex={currentPage} handlePageChange={handlePageChange} />
    </section>
  );
};

export default Projects;
