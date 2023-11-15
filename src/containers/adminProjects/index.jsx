import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent, CardActions, CardMedia, Box, Grid, LinearProgress } from "@mui/material";
import { getFileURL, addData, getData, deleteData } from "../../helpers/firebaseHelper";
import { useForm } from "react-hook-form";

export function ProjectCards({ projectName, projectDescription, projectImage, uid, getProjects }) {
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
      <CardActions>
        <Button
          size="small"
          onClick={async () => {
            await deleteData("projects", uid);
            getProjects();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loader, setLoder] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const getProjects = async () => {
    setLoder(true);
    await getData("projects")
      .then((res) => {
        setProjects(res);
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
    // console.log(payload);
    await addData("projects", payload)
      .then(() => {
        setLoder(false);
        getProjects();
        reset();
      })
      .catch(() => {
        setLoder(false);
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      {loader ? (
        <LinearProgress variant="determinate" sx={{ height: "6px" }} />
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
