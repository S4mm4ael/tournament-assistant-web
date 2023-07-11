import React, { useEffect, useState } from 'react';
import styles from './elo-calculator.module.css';
import { PairCard } from 'components/pair-card';
import { PlayerType } from 'types/Event.type';
import { EloInputCard } from 'components/elo-input-card';
import playersData from '../../components/pairings-system/meme-cup-players.json';

export function EloCalculatorPage() {
  const player1: PlayerType = {
    id: '1',
    elo: 1600,
    name: 'First player',
    primary: 0,
    to: 0,
    toOpponents: 0,
    vp: 0,
  };
  const player2: PlayerType = {
    id: '2',
    elo: 1600,
    name: 'Second Player',
    primary: 0,
    to: 0,
    toOpponents: 0,
    vp: 0,
  };
  const [playersList, setPlayersList] = useState(playersData);
  const [playerOne, setPlayerOne] = useState<PlayerType>(player1);
  const [playerTwo, setPlayerTwo] = useState<PlayerType>(player2);

  useEffect(() => {
    console.log(playersList);
  }, playersList);

  return (
    <div className={styles.EloCalculatorPage}>
      Here you can easily count your ELO after game.
      <EloInputCard
        playersList={playersList}
        setPlayersList={setPlayersList}
        setPlayerOne={setPlayerOne}
        setPlayerTwo={setPlayerTwo}
      ></EloInputCard>
      <PairCard player1={playerOne} player2={playerTwo}></PairCard>
    </div>
  );
}
