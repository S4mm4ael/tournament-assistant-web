import { EventType, PlayerType } from 'types/Event.type';
import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { eventsCol } from 'utils/firebase-config';
import styles from './event-page.module.css';

export function EventPage() {
  const [events, setEvents] = useState<Array<EventType>>([]);
  const [event, setEvent] = useState<EventType>();
  const [players, setPlayers] = useState<Array<PlayerType> | null | undefined>([]);

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
    };
    getEvent();
  }, [events]);

  useEffect(() => {
    if (event?.players) {
      () => {
        setPlayers(event?.players);
      };
    }
  }, [event, players]);

  return event ? (
    <div className={styles.EventPage}>
      <h1>{event.name}</h1>
      <div className={styles.EventPage__info}>
        <p className={styles.EventPage__infoItem}>
          {event.type === 'SINGLE' ? 'Single tournament' : 'Team tournament'}
        </p>
        <p className={styles.EventPage__infoItem}>{event.date.toString().slice(0, 10)}</p>
        <div className={styles.EventPage__infoFormat}>
          <p>
            <b>ELO restriction: </b>
            {event.elo ? `${event.elo}` : 'none'}
          </p>
          <p>
            <b>Desctiption: </b>
            {event.description}
          </p>
        </div>
      </div>
      <div className={styles.EventPage__players}>
        <table className={styles.EventPage__table} border={2} cellSpacing={2} cellPadding={1}>
          <thead>
            <tr>
              <td>Position</td>
              <td>Player</td>
              <td>TO</td>
              <td>TO opponents</td>
              <td>VP</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  ) : (
    <h1> Error </h1>
  );
}
