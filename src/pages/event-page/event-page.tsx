import { EventType } from 'types/Event.type';
import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { eventsCol } from 'utils/firebase-config';
import styles from './event-page.module.css';

export function EventPage() {
  const [events, setEvents] = useState<Array<EventType>>([]);
  const [event, setEvent] = useState<EventType>();

  useEffect(() => {
    (async () => {
      const eventsDocs = await getDocs(eventsCol);
      setEvents(eventsDocs.docs.map((eventDoc) => eventDoc.data()));
    })();
  }, []);
  useEffect(() => {
    const id = window.location.href.slice(-8);
    const getEvent = () => {
      setEvent(events.find((x) => x.id === id));
      //console.log(event?.1);
    };
    getEvent();
  }, [events]);
  return <div className={styles.EventPage}>{event?.name}</div>;
}
