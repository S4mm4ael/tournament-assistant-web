import { EventType } from 'types/Event.type';
import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { eventsCol } from 'utils/firebase-config';
import styles from './events-list.module.css';
import { Event } from 'components/event';

export function EventsList() {
  const [events, setEvents] = useState<Array<EventType>>([]);

  useEffect(() => {
    (async () => {
      const eventsDocs = await getDocs(eventsCol);
      setEvents(eventsDocs.docs.map((eventDoc) => eventDoc.data()));
    })();
  }, []);

  function sortEventsByDate(eventOne: EventType, eventTwo: EventType) {
    if (eventOne.date < eventTwo.date) {
      return -1;
    }
    if (eventOne.date > eventTwo.date) {
      return 1;
    }
    return 0;
  }

  const renderEvent = () => {
    return events
      .sort(sortEventsByDate)
      .map((event: EventType) => (
        <Event
          key={event.id}
          id={event.id}
          elo={event.elo}
          date={event.date}
          name={event.name}
          pts={event.pts}
          tours={event.tours}
          type={event.type}
        />
      ));
  };

  return (
    <section className={styles.EventsList}>
      <h2 className={styles.EventsList__title}>Events</h2>
      <ul className={styles.EventsList__list}>{renderEvent()}</ul>
    </section>
  );
}
