import React, { useEffect, useState } from 'react';
import styles from './elo-calculator.module.css';
import { PairCard } from 'components/pair-card';
import { EloInputCard } from 'components/elo-input-card';
import playersData from '../../components/pairings-system/meme-cup-players.json';
import { EloCalcPlayerData } from 'types/Calculator.type';

export function EloCalculatorPage() {
  const player1: EloCalcPlayerData = {
    id: '1',
    elo: 1700,
    firstname: 'Player',
    lastname: 'One',
    nickname: 'Player one',
  };
  const player2: EloCalcPlayerData = {
    id: '2',
    elo: 1700,
    firstname: 'Player',
    lastname: 'Two',
    nickname: 'Player two',
  };
  const [playersList, setPlayersList] = useState(playersData);
  const [playerOne, setPlayerOne] = useState(player1);
  const [playerTwo, setPlayerTwo] = useState(player2);

  return (
    <div className={styles.EloCalculatorPage}>
      Here you can easily count your ELO after game.
      <EloInputCard
        playersList={playersList}
        setPlayerOne={setPlayerOne}
        setPlayerTwo={setPlayerTwo}
      ></EloInputCard>
      <PairCard player1={playerOne} player2={playerTwo}></PairCard>
    </div>
  );
}
