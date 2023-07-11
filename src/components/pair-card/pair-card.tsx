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
            <b className={styles.pairFormElo}>Previous ELO:{player1.elo}</b>
          </div>

          <div className={styles.pairFormInputs}>
            <h4>Victory points</h4>
            <div className={styles.pairFormVPBox}>
              <input
                type="number"
                min="0"
                max="100"
                name={`${player1.name} VP`}
                id={player1.id}
                placeholder="VP"
              />
              <input
                type="number"
                min="0"
                max="100"
                name={`${player2.name} VP`}
                id={player2.id}
                placeholder="VP"
              />
            </div>
          </div>
          <div className={styles.pairFormNames}>
            <b>{player2.name}</b>
            <b className={styles.pairFormElo}>Previous ELO:{player2.elo}</b>
          </div>
          <button type="submit">✔</button>
        </form>
      </div>
    </div>
  );
}
