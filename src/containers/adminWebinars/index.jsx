import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent, CardActions, CardMedia, Box, Grid, LinearProgress } from "@mui/material";
import { getFileURL, addData, getData, deleteData } from "../../helpers/firebaseHelper";
import { useForm } from "react-hook-form";

export function WebinarCard({ webinarHeader, webinarDate, webinarStarttime, webinarDescription, webinarImage, webinarSpeaker, uid, getWebinars }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia sx={{ height: 150 }} image={webinarImage} title={webinarHeader} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {webinarHeader}
        </Typography>
        <Typography variant="h5" component="div">
          {webinarDate} - {webinarStarttime}
        </Typography>
        <Typography sx={{ margin: "20px 0px" }} height={"150px"} overflow={"scroll"} color="text.secondary">
          {webinarDescription}
        </Typography>
        <Typography variant="body2">{webinarSpeaker}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={async () => {
            await deleteData("webinars", uid);
            getWebinars();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

const AdminWebinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loader, setLoder] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const getWebinars = async () => {
    setLoder(true);
    await getData("webinars")
      .then((res) => {
        setWebinars(res);
        setLoder(false);
      })
      .catch(() => {
        alert("Something went wrong");
        setLoder(false);
      });
  };

  const handleWebinarSubmit = async (data) => {
    setLoder(true);
    const payload = { ...data, webinarImage: await getFileURL(data?.webinarImage[0], "webinars") };
    // console.log(payload);
    await addData("webinars", payload)
      .then(() => {
        setLoder(false);
        getWebinars();
        reset();
      })
      .catch(() => {
        setLoder(false);
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    getWebinars();
  }, []);

  return (
    <>
      {loader ? (
        <LinearProgress variant="determinate" sx={{ height: "6px" }} />
      ) : (
        <>
          <Container component="main" sx={{ my: 5 }}>
            <Typography fontSize={"26px"} fontWeight={"600"} margin={"20px 0px 50px 0px"} variant="h5">
              Add Webinars
            </Typography>
            <form onSubmit={handleSubmit(handleWebinarSubmit)}>
              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Webinar Name
                </Typography>
                <TextField type="text" sx={{ margin: "6px 0px" }} variant="outlined" error={errors["webinarHeader"]?.message} fullWidth {...register("webinarHeader", { required: "Webinar name is required" })} />
                {errors["webinarHeader"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["webinarHeader"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Webinar Date
                </Typography>
                <TextField type="date" sx={{ margin: "6px 0px" }} variant="outlined" error={errors["webinarDate"]?.message} fullWidth {...register("webinarDate", { required: "Webinar Date is required" })} />
                {errors["webinarDate"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["webinarDate"]?.message}
                  </Typography>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12}>
                  <Box margin={"20px 0px"}>
                    <Typography variant="body1" margin={"0px"} color={"grey"}>
                      Webinar Start Time
                    </Typography>
                    <TextField sx={{ margin: "6px 0px" }} type="time" variant="outlined" error={errors["webinarStarttime"]?.message} fullWidth {...register("webinarStarttime", { required: "Webinar Starttime is required" })} />
                    {errors["webinarStarttime"]?.message && (
                      <Typography variant="caption" margin={"0px"} color={"red"}>
                        {errors["webinarStarttime"]?.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12}>
                  <Box margin={"20px 0px"}>
                    <Typography variant="body1" margin={"0px"} color={"grey"}>
                      Webinar End Time
                    </Typography>
                    <TextField
                      sx={{ margin: "6px 0px" }}
                      type="time"
                      variant="outlined"
                      error={errors["webinarEndtime"]?.message}
                      fullWidth
                      {...register("webinarEndtime", {
                        required: "Webinar Endtime is required",
                        validate: {
                          notEarlierThanStart: (value) => value >= getValues("webinarStarttime") || "EndTime should not be earlier than the starttime",
                        },
                      })}
                    />
                    {errors["webinarEndtime"]?.message && (
                      <Typography variant="caption" margin={"0px"} color={"red"}>
                        {errors["webinarEndtime"]?.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Webinar Speaker
                </Typography>
                <TextField sx={{ margin: "6px 0px" }} type="text" variant="outlined" error={errors["webinarSpeaker"]?.message} fullWidth {...register("webinarSpeaker", { required: "Webinar Speaker is required" })} />
                {errors["webinarSpeaker"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["webinarSpeaker"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Webinar Description
                </Typography>
                <TextField sx={{ margin: "6px 0px" }} multiline rows={4} variant="outlined" error={errors["webinarDescription"]?.message} fullWidth {...register("webinarDescription", { required: "Webinar Description is required" })} />
                {errors["webinarDescription"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["webinarDescription"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Webinar Image
                </Typography>
                <TextField
                  sx={{ margin: "6px 0px" }}
                  type="file"
                  inputProps={{
                    accept: ".png, .jpg, .jpeg",
                  }}
                  variant="outlined"
                  error={errors["webinarImage"]?.message}
                  fullWidth
                  {...register("webinarImage", { required: "Webinar image is required" })}
                />
                {errors["webinarImage"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["webinarImage"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Webinar Register Link
                </Typography>
                <TextField sx={{ margin: "6px 0px" }} type="url" variant="outlined" error={errors["webinarRegisterLink"]?.message} fullWidth {...register("webinarRegisterLink", { required: "Webinar Registration Link is required" })} />
                {errors["webinarRegisterLink"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["webinarRegisterLink"]?.message}
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
              Manage Webinars
            </Typography>
            <Grid container alignItems={"stretch"} spacing={3}>
              {webinars.map((webinars, index) => (
                <Grid item={true} key={index} lg={4} md={6} xs={12}>
                  <WebinarCard {...webinars} key={webinars.uid} getWebinars={getWebinars} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default AdminWebinars;
