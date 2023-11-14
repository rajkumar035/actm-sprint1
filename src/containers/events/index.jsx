import React, { useEffect, useState } from 'react';
import './index.css';
import Grid from '@mui/material/Grid';
import locationico from '../../assets/svg/location.svg';
import timeico from '../../assets/svg/time.svg';
import dateico from '../../assets/svg/date.svg';
import { Pagination } from '@mui/material';
import { getData } from '../../helpers/firebaseHelper';

const EventCard = (props) => {
  const {
    eventName,
    eventDate,
    eventTime,
    eventDescription,
    eventImage,
    eventLocation,
    eventCTA,
  } = props;
  return (
    <div className='eventcard'>
      <img alt={eventName} src={eventImage} />
      <div className='eventcard__content'>
        <h6>{eventName}</h6>
        <div className='dividerv2' />
        <div className='eventcard_specifications'>
          <div>
            <img alt='location' src={locationico} />
            <h6>{eventLocation}</h6>
          </div>
          <div>
            <img alt='time' src={timeico} />
            <h6>{eventTime}</h6>
          </div>
          <div>
            <img alt='date' src={dateico} />
            <h6>{eventDate}</h6>
          </div>
        </div>
        <div className='eventcard_description'>{eventDescription}</div>
        <a href={eventCTA}>Learn More</a>
      </div>
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const getEventsData = async () => {
    const res = await getData('events');
    setEvents(res);
  };
  useEffect(() => {
    getEventsData();
  }, []);
  return (
    <section className='eventscontainer'>
      <div className='eventsContainer__header'>
        <h6>All Events</h6>
        <div className='divider' />
        <p>
          Compete in symposiums and contests that celebrate innovation and
          excellence. Win accolades that will bolster your career and open doors
          to new opportunities
        </p>
      </div>
      <div className='eventsContainer_cards'>
        <Grid container spacing={6}>
          {events.map((event) => {
            return (
              <Grid item={true} key={event.uid} lg={4} md={6} xs={12}>
                <EventCard {...event} />
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className='pagination'>
        <Pagination color='secondary' count={10} sx={{ color: '#8cad78' }} />
      </div>
    </section>
  );
};

export default Events;
