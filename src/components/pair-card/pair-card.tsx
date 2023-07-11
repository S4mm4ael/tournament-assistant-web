import React from 'react';

import styles from './pair-card.module.css';
import { PlayerType } from 'types/Event.type';

type PairCardProps = {
  player1: PlayerType;
  player2: PlayerType;
};

export function PairCard({ player1, player2 }: PairCardProps) {
  return (
    <div key={player1.name + '-' + player2.name} className={styles.PairingsPage__pairCard}>
      <div className={styles.PairingsPage__pairFormWrapper}>
        <form className={styles.PairingsPage__pairForm}>
          <div className={styles.PairingsPage__pairFormNames}>
            <b>{player1.name}</b>
            {player1.proxy ? 'PROXY' : player1.elo}

            <b>{player2.name}</b>
            {player2.proxy ? 'PROXY' : player2.elo}
          </div>

          <div className={styles.PairingsPage__pairFormInputs}>
            <input type="number" min="0" max="100" name={`${player1.name} VP`} />
            <input type="number" min="0" max="100" name={`${player2.name} VP`} id={player2.id} />
            <button type="submit">✔</button>
          </div>
        </form>
      </div>
    </div>
  );
}
