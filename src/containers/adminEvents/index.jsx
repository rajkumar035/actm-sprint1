import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent, CardActions, CardMedia, Box, Grid } from "@mui/material";
import { getFileURL, addData, getData, deleteData } from "../../helpers/firebaseHelper";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader";

export function EventCard({ eventName, eventDate, eventTime, eventDescription, eventImage, eventLocation, uid, getEventsData }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia sx={{ height: 150 }} image={eventImage} title={eventName} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {eventName}
        </Typography>
        <Typography variant="h5" component="div">
          {eventDate} - {eventTime}
        </Typography>
        <Typography sx={{ margin: "20px 0px" }} height={"150px"} overflow={"scroll"} color="text.secondary">
          {eventDescription}
        </Typography>
        <Typography variant="body2">{eventLocation}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={async () => {
            await deleteData("events", uid);
            getEventsData();
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loader, setLoder] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const getEventsData = async () => {
    setLoder(true);
    await getData("events")
      .then((res) => {
        setEvents(res);
        setLoder(false);
      })
      .catch(() => {
        alert("Something went wrong");
        setLoder(false);
      });
  };

  const handleEventsSubmit = async (data) => {
    setLoder(true);
    const payload = { ...data, eventImage: await getFileURL(data?.eventImage[0], "events") };
    // console.log(payload);
    await addData("events", payload)
      .then(() => {
        setLoder(false);
        getEventsData();
        reset();
      })
      .catch(() => {
        setLoder(false);
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Container component="section" sx={{ my: 5 }}>
            <Typography fontSize={"26px"} fontWeight={"600"} margin={"20px 0px 50px 0px"} variant="h5">
              Add Event
            </Typography>
            <form onSubmit={handleSubmit(handleEventsSubmit)}>
              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Event Name
                </Typography>
                <TextField type="text" sx={{ margin: "6px 0px" }} variant="outlined" error={errors["eventName"]?.message} fullWidth {...register("eventName", { required: "Event name is required" })} />
                {errors["eventName"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["eventName"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Event Location
                </Typography>
                <TextField type="text" sx={{ margin: "6px 0px" }} variant="outlined" error={errors["eventLocation"]?.message} fullWidth {...register("eventLocation", { required: "Event Location is required" })} />
                {errors["eventLocation"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["eventLocation"]?.message}
                  </Typography>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12}>
                  <Box margin={"20px 0px"}>
                    <Typography variant="body1" margin={"0px"} color={"grey"}>
                      Event Start Time
                    </Typography>
                    <TextField sx={{ margin: "6px 0px" }} type="time" variant="outlined" error={errors["eventStarttime"]?.message} fullWidth {...register("eventStarttime", { required: "Event Starttime is required" })} />
                    {errors["eventStarttime"]?.message && (
                      <Typography variant="caption" margin={"0px"} color={"red"}>
                        {errors["eventStarttime"]?.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12}>
                  <Box margin={"20px 0px"}>
                    <Typography variant="body1" margin={"0px"} color={"grey"}>
                      Event End Time
                    </Typography>
                    <TextField
                      sx={{ margin: "6px 0px" }}
                      type="time"
                      variant="outlined"
                      error={errors["eventEndtime"]?.message}
                      fullWidth
                      {...register("eventEndtime", {
                        required: "Event Endtime is required",
                        validate: {
                          notEarlierThanStart: (value) => value >= getValues("eventStarttime") || "EndTime should not be earlier than the starttime",
                        },
                      })}
                    />
                    {errors["eventEndtime"]?.message && (
                      <Typography variant="caption" margin={"0px"} color={"red"}>
                        {errors["eventEndtime"]?.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Event Date
                </Typography>
                <TextField sx={{ margin: "6px 0px" }} type="date" variant="outlined" error={errors["eventDate"]?.message} fullWidth {...register("eventDate", { required: "Eventdate is required" })} />
                {errors["eventDate"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["eventDate"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Event Description
                </Typography>
                <TextField sx={{ margin: "6px 0px" }} multiline rows={4} variant="outlined" error={errors["eventDescription"]?.message} fullWidth {...register("eventDescription", { required: "Event Description is required" })} />
                {errors["eventDescription"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["eventDescription"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Event Image
                </Typography>
                <TextField
                  sx={{ margin: "6px 0px" }}
                  type="file"
                  inputProps={{
                    accept: ".png, .jpg, .jpeg",
                  }}
                  variant="outlined"
                  error={errors["eventImage"]?.message}
                  fullWidth
                  {...register("eventImage", { required: "Event image is required" })}
                />
                {errors["eventImage"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["eventImage"]?.message}
                  </Typography>
                )}
              </Box>

              <Box margin={"20px 0px"}>
                <Typography variant="body1" margin={"0px"} color={"grey"}>
                  Event Register Link
                </Typography>
                <TextField sx={{ margin: "6px 0px" }} type="url" variant="outlined" error={errors["eventCTA"]?.message} fullWidth {...register("eventCTA", { required: "Event Registration Link is required" })} />
                {errors["eventCTA"]?.message && (
                  <Typography variant="caption" margin={"0px"} color={"red"}>
                    {errors["eventCTA"]?.message}
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
              Manage Events
            </Typography>
            <Grid container alignItems={"stretch"} spacing={3}>
              {events.map((event, index) => (
                <Grid item={true} key={index} lg={4} md={6} xs={12}>
                  <EventCard {...event} key={event.uid} getEventsData={getEventsData} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default AdminEvents;
