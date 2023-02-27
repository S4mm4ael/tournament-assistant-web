import { EventType, PlayerType } from 'types/Event.type';
import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { eventsCol } from 'utils/firebase-config';
import styles from './event-page.module.css';
import { PairingType } from 'types/Pairings.type';

export function EventPage() {
  const [events, setEvents] = useState<Array<EventType>>([]);
  const [event, setEvent] = useState<EventType>();
  const [players, setPlayers] = useState<Array<PlayerType>>([]);
  const [tour1, setTour1] = useState<Array<PairingType>>([]);

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

  //TODO REWRITE TO PLAYER
  useEffect(() => {
    if (event?.players != undefined) {
      setPlayers(event.players);
    }
  }, [event, players]);

  function renderPlayers() {
    return players
      .sort((a, b) => b.to - a.to || b.toOpponents - a.toOpponents || b.vp - a.vp)
      .map((player, index) => (
        <tr key={player.id}>
          <td>{index + 1}</td>
          <td>{player.name}</td>
          <td>{player.to}</td>
          <td>{player.toOpponents}</td>
          <td>{player.vp}</td>
        </tr>
      ));
  }

  function rendetTour(tourNumber: number) {
    let tour: undefined | PairingType[];
    switch (tourNumber) {
      case 1:
        if (event?.tour1) {
          tour = event?.tour1;
        }
        break;
      case 2:
        if (event?.tour2) {
          tour = event?.tour2;
        }
        break;

      case 3:
        if (event?.tour3) {
          tour = event?.tour3;
        }
        break;
      default:
        break;
    }

    if (event?.players && tour) {
      return tour.map((tourItem) => (
        <tr key={tourItem.players[0]}>
          <td>{players.find((x) => x.id === tourItem.players[0])?.name}</td>
          <td>{tourItem.toRes[0]}</td>
          <td>{tourItem.vpRes[0]}</td>
          <td>{tourItem.vpRes[1]}</td>
          <td>{tourItem.toRes[1]}</td>
          <td>{players.find((x) => x.id === tourItem.players[1])?.name}</td>
        </tr>
      ));
    }
    return;
  }

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
      <div className={styles.EventPage__playersAndPairings}>
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
        <table className={styles.EventPage__table} border={2} cellSpacing={2} cellPadding={1}>
          <thead>
            <tr>
              <td>Player1</td>
              <td>Player1 TO</td>
              <td>Player1 VP</td>
              <td>Player2 VP</td>
              <td>Player2 TO</td>
              <td>Player2</td>
            </tr>
          </thead>
          <tbody className={styles.EventPage__tableTours}>
            <tr className={styles.EventPage__toursHeader}>
              <td>Tour 1</td>
            </tr>
            {rendetTour(1)}
            <tr className={styles.EventPage__toursHeader}>
              <td>Tour 2</td>
            </tr>
            {rendetTour(2)}
            <tr className={styles.EventPage__toursHeader}>
              <td>Tour 3</td>
            </tr>
            {rendetTour(3)}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className={styles.EventPage}>
      <h1> Loading... </h1>
    </div>
  );
}
