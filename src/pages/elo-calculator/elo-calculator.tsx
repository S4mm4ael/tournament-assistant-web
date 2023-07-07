import React, { useEffect, useState } from 'react';
import styles from './elo-calculator.module.css';
import { PairCard } from 'components/pair-card';
import { PlayerType } from 'types/Event.type';

export function EloCalculatorPage() {
  const player1: PlayerType = {
    id: '1',
    elo: 1490,
    name: 'Marat',
    primary: 0,
    to: 0,
    toOpponents: 0,
    vp: 0,
  };
  const player2: PlayerType = {
    id: '2',
    elo: 1390,
    name: 'Second',
    primary: 0,
    to: 0,
    toOpponents: 0,
    vp: 0,
  };

  return (
    <div className={styles.EloCalculatorPage}>
      Calculate!
      <PairCard player1={player1} player2={player2}></PairCard>
    </div>
  );
}
