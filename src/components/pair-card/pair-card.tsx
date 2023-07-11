import React from 'react';

import styles from './pair-card.module.css';
import { PlayerType } from 'types/Event.type';

type PairCardProps = {
  player1: PlayerType;
  player2: PlayerType;
};

export function PairCard({ player1, player2 }: PairCardProps) {
  return (
    <div key={player1.name + '-' + player2.name} className={styles.pairCard}>
      <div className={styles.pairFormWrapper}>
        <form className={styles.pairForm}>
          <div className={styles.pairFormNames}>
            <b>{player1.name}</b>
          </div>

          <div className={styles.pairFormInputs}>
            <input type="number" min="0" max="100" name={`${player1.name} VP`} />
            <input type="number" min="0" max="100" name={`${player2.name} VP`} id={player2.id} />
          </div>
          <div className={styles.pairFormNames}>
            <b>{player2.name}</b>
          </div>
          <button type="submit">✔</button>
        </form>
      </div>
    </div>
  );
}
