import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent, CardActions, CardMedia, Box, Grid, Select, MenuItem, Chip } from "@mui/material";
import { getFileURL, addData, getData, deleteData } from "../../helpers/firebaseHelper";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

export function ProjectCards({ projectName, projectDescription, projectImage, uid, getProjects, projectStatus }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia sx={{ height: 150 }} image={projectImage} title={projectName} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {projectName}
        </Typography>
        <Typography sx={{ margin: "20px 0px" }} height={"150px"} overflow={"scroll"} color="text.secondary">
          {projectDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Button
          variant="contained"
          size="small"
          onClick={async () => {
            await deleteData("projects", uid);
            getProjects();
          }}
        >
          Delete
        </Button>
        <Chip label={projectStatus} variant="outlined" sx={{ border: projectStatus === "Not Started" ? "2px solid blue" : projectStatus === "InProgress" ? "2px solid yellow" : "2px solid green", fontWeight: "600", letterSpacing: "0.02em" }} />
      </CardActions>
    </Card>
  );
}

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [realProjects, setRealProjects] = useState([]);
  const [loader, setLoder] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleFilter = (text) => {
    if (text === "") {
      setProjects(realProjects);
    } else {
      const getData = realProjects?.filter((items) => {
        return items?.projectStatus === text;
      });
      setProjects(getData);
    }
  };

  const getProjects = async () => {
    setLoder(true);
    await getData("projects")
      .then((res) => {
        setProjects(res);
        setRealProjects(res);
        setLoder(false);
      })
      .catch(() => {
        alert("Something went wrong");
        setLoder(false);
      });
  };

  const handleProjectSubmit = async (data) => {
    setLoder(true);
    const payload = { ...data, projectImage: await getFileURL(data?.projectImage[0], "projects") };
    await addData("projects", payload)
      .then(() => {
        setLoder(false);
        getProjects();
        reset();
      })
      .catch(() => {
        setLoder(false);
        navigate("/");
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Container component="main" sx={{ my: 5 }}>
            <Typography fontSize={"26px"} fontWeight={"600"} margin={"20px 0px 50px 0px"} variant="h5">
              Add Projects
            </Typography>
            <form onSubmit={handleSubmit(handleProjectSubmit)}>
              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Project Name
                </Typography>
                <TextField type="text" sx={{ margin: "6px 0px" }} variant="outlined" error={errors["projectName"]?.message} fullWidth {...register("projectName", { required: "Project name is required" })} />
                {errors["projectName"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["projectName"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Project Description
                </Typography>
                <TextField sx={{ margin: "6px 0px" }} multiline rows={4} variant="outlined" error={errors["projectDescription"]?.message} fullWidth {...register("projectDescription", { required: "Project Description is required" })} />
                {errors["projectDescription"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["projectDescription"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Project Image
                </Typography>
                <TextField
                  sx={{ margin: "6px 0px" }}
                  type="file"
                  inputProps={{
                    accept: ".png, .jpg, .jpeg",
                  }}
                  variant="outlined"
                  error={errors["projectImage"]?.message}
                  fullWidth
                  {...register("projectImage", { required: "Project image is required" })}
                />
                {errors["projectImage"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["projectImage"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Project Status
                </Typography>
                <Select variant="outlined" error={errors["projectStatus"]?.message} defaultValue={"Not Started"} fullWidth {...register("projectStatus", { required: "Project Status is required" })}>
                  <MenuItem value={"Not Started"}>Not Started</MenuItem>
                  <MenuItem value={"InProgress"}>In-Progress</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                </Select>
                {errors["projectStatus"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["projectStatus"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Project Link
                </Typography>
                <TextField sx={{ margin: "6px 0px" }} type="url" variant="outlined" error={errors["projectLink"]?.message} fullWidth {...register("projectLink", { required: "Project Link is required" })} />
                {errors["projectLink"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["projectLink"]?.message}
                  </Typography>
                )}
              </Box>

              <Button type="submit" size="large" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
          </Container>
          <Container component="main" sx={{ my: 5 }}>
            <Typography fontSize={"26px"} fontWeight={"600"} margin={"20px 0px"} variant="h5">
              Manage Projects
            </Typography>
            <Box margin={"30px 0px"} flexWrap={"wrap"} alignItems={"center"} display={"flex"} gap={"10px"}>
              <Button
                variant="outlined"
                sx={{ borderColor: "blue" }}
                onClick={() => {
                  handleFilter("Not Started");
                }}
              >
                Not Started
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "blue" }}
                onClick={() => {
                  handleFilter("InProgress");
                }}
              >
                In Progress
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "blue" }}
                onClick={() => {
                  handleFilter("Completed");
                }}
              >
                Completed
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleFilter("");
                }}
              >
                Clear Filter
              </Button>
            </Box>
            <Grid container alignItems={"stretch"} spacing={3}>
              {projects.map((projects, index) => (
                <Grid item={true} key={index} lg={4} md={6} xs={12}>
                  <ProjectCards {...projects} key={projects.uid} getProjects={getProjects} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default AdminProjects;
