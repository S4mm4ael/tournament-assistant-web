/* eslint-disable */
import { EventType, PlayerType } from 'types/Event.type';
import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { eventsCol } from 'utils/firebase-config';
import styles from './event-page.module.css';
import { Link } from 'react-router-dom';
import { PairingTable } from 'components/pairing-table';

export function EventPage() {
  const [event, setEvent] = useState<EventType>();
  const [players, setPlayers] = useState<Array<PlayerType> | undefined>([]);
  const id = window.location.href.slice(-8);

  useEffect((() => {
    async function fetchDocs() {
      const eventsDocs = await getDocs(eventsCol);
      const eventsList = eventsDocs.docs.map((eventDoc) => eventDoc.data());

      return eventsList
    }
    async function findEvent(events: EventType[]) {
      const currentEvent = await events.find((x) => x.id === id)
      setEvent(currentEvent)
      return currentEvent
    }
    async function getPlayers(currentEvent: EventType) {
      const players = await currentEvent.appliedPlayers

      setPlayers(players)
    }

    fetchDocs()
      .then((eventList) => findEvent(eventList))
      .then((event) => { if (event) getPlayers(event) })


  }), [])

  function renderPlayers() {

    function defineColors(place: number) {
      const colors = ['#ffDE03', '#E0E0E0', '#F57C00'];
      let color: string;
      switch (place) {
        case 0:
          color = colors[0];
          break;
        case 1:
          color = colors[1];
          break;

        case 2:
          color = colors[2];
          break;
        default:
          color = 'none';
          break;
      }
      return color;
    }

    return (
      players &&
      players
        .sort((a, b) => b.to - a.to || b.toOpponents - a.toOpponents || b.vp - a.vp)
        .map((player, index) => (
          <tr key={player.id}>
            <td
              style={{ backgroundColor: defineColors(index) }}
              className={styles.EventPage__tablePoints}
            >
              {index + 1}
            </td>
            <td
              style={{ backgroundColor: defineColors(index) }}
              className={styles.EventPage__tableNames}
            >
              {player.name}
            </td>
            <td
              style={{ backgroundColor: defineColors(index) }}
              className={styles.EventPage__tablePoints}
            >
              {player.to}
            </td>
            <td
              style={{ backgroundColor: defineColors(index) }}
              className={styles.EventPage__tablePoints}
            >
              {player.toOpponents}
            </td>
            <td
              style={{ backgroundColor: defineColors(index) }}
              className={styles.EventPage__tablePoints}
            >
              {player.vp}
            </td>
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
          <p className={styles.EventPage__infoItem}>{event.date && event.date.toString().slice(0, 10)}</p>
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
            <div className={styles.EventPage__title}>
              <h3>Standings:</h3>
            </div>

            <table className={styles.EventPage__table} border={2} cellSpacing={2} cellPadding={1}>
              <thead>
                <tr>
                  <td className={styles.EventPage__tablePoints}>Position</td>
                  <td className={styles.EventPage__tableNames}>Player</td>
                  <td className={styles.EventPage__tablePoints}>TO</td>
                  <td className={styles.EventPage__tablePoints}>TO opponents</td>
                  <td className={styles.EventPage__tablePoints}>VP</td>
                </tr>
              </thead>
              <tbody>{renderPlayers()}</tbody>
            </table>
          </div>
          <div className={styles.EventPage__pairings}>
            <div className={styles.EventPage__title}>
              <h3>Pairings:</h3>
            </div>
            {players && <PairingTable eventP={event} playersP={players} />}
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
