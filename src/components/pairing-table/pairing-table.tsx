import React, { useState } from 'react';
import { EventType, PlayerType } from 'types/Event.type';
import { PairingType } from 'types/Pairings.type';

import styles from './pairing-table.module.css';

type EventProps = {
  eventP: EventType;
};

export function PairingTable({ eventP }: EventProps) {
  const event = eventP;
  const [players, setPlayers] = useState<Array<PlayerType> | null>([]);
  function renderTour(tourNumber: number) {
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
    if (players && tour) {
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

  return (
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
        {renderTour(1)}
        <tr className={styles.EventPage__toursHeader}>
          <td>Tour 2</td>
        </tr>
        {renderTour(2)}
        <tr className={styles.EventPage__toursHeader}>
          <td>Tour 3</td>
        </tr>
        {renderTour(3)}
      </tbody>
    </table>
  );
}
