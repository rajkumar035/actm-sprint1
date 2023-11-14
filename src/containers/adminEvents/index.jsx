import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  FormLabel,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Stack,
} from '@mui/material';
import {
  getFileURL,
  addData,
  getData,
  deleteData,
} from '../../helpers/firebaseHelper';

export function EventCard({
  eventName,
  eventDate,
  eventTime,
  eventDescription,
  eventImage,
  eventLocation,
  uid,
  getEventsData,
}) {
  return (
    <Card sx={{ minWidth: 300 }}>
      <CardMedia sx={{ height: 150 }} image={eventImage} title={eventName} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {eventName}
        </Typography>
        <Typography variant='h5' component='div'>
          {eventDate}-{eventTime}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {eventDescription}
        </Typography>
        <Typography variant='body2'>{eventLocation}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={async () => {
            await deleteData('events', uid);
            getEventsData();
          }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

const AdminEvents = () => {
  const getEventsData = async () => {
    const res = await getData('events');
    setEvents(res);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj);
    const imageURL = await getFileURL(formDataObj.eventImage, 'events');
    formDataObj.eventImage = imageURL;
    await addData('events', formDataObj);
    getEventsData();
  };
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventsData();
  }, []);
  return (
    <>
      <Container component='main' sx={{ my: 5 }}>
        <Typography component='h1' variant='h5'>
          Add Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name='eventName'
            label='Event Name'
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <TextField
            name='eventLocation'
            label='Event Location'
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <FormLabel>Event Time</FormLabel>
          <TextField
            name='eventTime'
            type='time'
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <FormLabel>Event Date</FormLabel>
          <TextField
            name='eventDate'
            type='date'
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <TextField
            name='eventDescription'
            label='Event Description'
            multiline
            rows={4}
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <FormLabel>Event Image</FormLabel>
          <TextField
            name='eventImage'
            type='file'
            variant='outlined'
            fullWidth
          />
          <TextField
            name='eventCTA'
            label='Event Register Link'
            type='url'
            variant='outlined'
            margin='normal'
            fullWidth
          />
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Submit
          </Button>
        </form>
      </Container>
      <Container component='main' sx={{ my: 5 }}>
        <Typography component='h1' variant='h5' sx={{ my: 5 }}>
          Manage Events
        </Typography>
        <Stack direction='row' spacing={2}>
          {events.map((event) => (
            <EventCard
              {...event}
              key={event.uid}
              getEventsData={getEventsData}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default AdminEvents;
