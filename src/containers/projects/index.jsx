import React from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import sampleproject from "../../assets/images/projectsample.png";
import AppPagination from "../../components/Pagination";

const ProjectCard = (props) => {
  const { headerImg, header } = props;
  return (
    <div className={"projectcard"}>
      <div className="projectcard__thumbnail">
        <img alt="thumbnail" src={headerImg} />
        <div className="see-more-overlay">
          <button>See More</button>
        </div>
      </div>
      <div className="projectcard__content">
        <h6>{header}</h6>
      </div>
    </div>
  );
};

const Projects = () => {
  const boiler = [
    {
      id: 1,
      header: "The Use of Virtual and Augmented Reality in Medicine",
      headerImg: sampleproject,
    },
    {
      id: 2,
      header: "The Use of Virtual and Augmented",
      headerImg: sampleproject,
    },
    {
      id: 3,
      header: "The Use of Virtual and Augmented Reality in Medicine The Use of Virtual and Augmented Reality in Medicine The Use of Virtual and Augmented Reality in Medicine",
      headerImg: sampleproject,
    },
    {
      id: 4,
      header: "The Use of Virtual and Augmented Reality in Medicine",
      headerImg: sampleproject,
    },
    {
      id: 5,
      header: "The Use of Virtual and Augmented Reality in Medicine",
      headerImg: sampleproject,
    },
  ];
  return (
    <section className="projectscontainer">
      <div className="projectsContainer__header">
        <h6>All Projects</h6>
        <div className="divider" />
      </div>
      <div className="projectsContainer_cards">
        <Grid container spacing={4} alignItems={"stretch"}>
          {boiler.map((items, index) => {
            return (
              <Grid item={true} key={index} lg={3} md={4} sm={6} xs={12}>
                <ProjectCard {...items} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <AppPagination />
    </section>
  );
};

export default Projects;
