/* eslint-disable prettier/prettier */
import React from 'react';

import styles from './elo-input-card.module.css';
import { PlayerType } from 'types/Event.type';
import { PlayersDropdown } from 'components/players-dropdown';

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
  return <div className={styles.EloInputCard}>
    <div className={styles.EloInputCard__sideWrapper}>
      <h4>Select first Player</h4>
      <PlayersDropdown></PlayersDropdown>

      <input type="checkbox" name="player-one-check" />
      <label htmlFor="player-one-check"> Custom ELO</label><br></br>
    </div>
    <div className={styles.EloInputCard__sideWrapper}>
      <h4>Select second Player</h4>
      <PlayersDropdown></PlayersDropdown>
      <input type="checkbox" name="player-two-check" />
      <label htmlFor="player-two-check"> Custom ELO</label><br></br>
    </div>
  </div>;
}
