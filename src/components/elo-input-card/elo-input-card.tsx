/* eslint-disable prettier/prettier */
import React from 'react';

import styles from './elo-input-card.module.css';
import { PlayerType } from 'types/Event.type';

type PlayerMockData = {
  id: string;
  elo: number;
  firstname: string;
  lastname: string;
  nickname: string;
  proxy?: undefined;
} | {
  id: string;
  elo: number;
  firstname: string;
  lastname: string;
  nickname: string;
  proxy: boolean;
}


type EloInputCardProps = {
  playersList: PlayerMockData[];
  setPlayersList: React.Dispatch<React.SetStateAction<PlayerMockData[]>>;
  setPlayerOne: React.Dispatch<React.SetStateAction<PlayerType>>;
  setPlayerTwo: React.Dispatch<React.SetStateAction<PlayerType>>;
};

export function EloInputCard({
  playersList,
  setPlayersList,
  setPlayerOne,
  setPlayerTwo,
}: EloInputCardProps) {
  return <div className={styles.EloInputCard}>Input here</div>;
}
