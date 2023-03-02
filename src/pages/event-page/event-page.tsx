import { EventType, PlayerType } from 'types/Event.type';
import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { eventsCol } from 'utils/firebase-config';
import styles from './event-page.module.css';
import { PairingType } from 'types/Pairings.type';
import { Link } from 'react-router-dom';
import { PairingTable } from 'components/pairing-table';

export function EventPage() {
  const [events, setEvents] = useState<Array<EventType>>([]);
  const [event, setEvent] = useState<EventType>();
  const [players, setPlayers] = useState<Array<PlayerType> | null>([]);

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
    if (event?.players != undefined) {
      setPlayers(event.players);
    } else {
      setPlayers(null);
    }
  }, [event, players]);

  function renderPlayers() {
    return (
      players &&
      players
        .sort((a, b) => b.to - a.to || b.toOpponents - a.toOpponents || b.vp - a.vp)
        .map((player, index) => (
          <tr key={player.id}>
            <td>{index + 1}</td>
            <td>{player.name}</td>
            <td>{player.to}</td>
            <td>{player.toOpponents}</td>
            <td>{player.vp}</td>
          </tr>
        ))
    );
  }

  return event ? (
    <>
      <div className="breadCrumbs">
        <Link className="backButton" to={'/'}>
          Back
        </Link>
      </div>
      <div className={styles.EventPage}>
        <h1>{event.name}</h1>
        <div className={styles.EventPage__info}>
          <p className={styles.EventPage__infoItem}>
            {event.type === 'SOLO' ? 'Single tournament' : 'Team tournament'}
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
        <div className={styles.EventPage__playersAndPairings}>
          <div className={styles.EventPage__players}>
            <h3>Standings:</h3>
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
              <tbody>{renderPlayers()}</tbody>
            </table>
          </div>
          <div className={styles.EventPage__pairings}>
            <h3>Pairings:</h3>
            <PairingTable eventP={event} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className={styles.EventPage}>
      <h1> Loading... </h1>
    </div>
  );
}
