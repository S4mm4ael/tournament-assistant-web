/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import styles from './elo-input-card.module.css';
import { PlayersDropdown } from 'components/players-dropdown';
import { EloCalcPlayerData, EloInputCardProps } from 'types/Calculator.type';

export function EloInputCard({ playersList, setPlayerOne, setPlayerTwo }: EloInputCardProps) {
  const [ifCustomFirst, setIfCustomFirst] = useState(false);
  const [ifCustomSecond, setIfCustomSecond] = useState(false);
  const [customEloFirst, setCustomEloFirst] = useState(1700);
  const [customEloSecond, setCustomEloSecond] = useState(1700);

  function handleCustomCheck(playerNum: number) {
    if (playerNum === 1) {
      ifCustomFirst ? setIfCustomFirst(false) : setIfCustomFirst(true);
      setPlayerOne?.({
        id: '1',
        elo: 1700,
        firstname: 'Player',
        lastname: 'One',
        nickname: 'Player one',
      });
    } else {
      ifCustomSecond ? setIfCustomSecond(false) : setIfCustomSecond(true);
      setPlayerTwo?.({
        id: '2',
        elo: 1700,
        firstname: 'Player',
        lastname: 'Two',
        nickname: 'Player two',
      });
    }
  }
  function adjustCustomElo(playerNum: number, eloValue: number) {
    let newPlayerData: EloCalcPlayerData;

    if (playerNum === 1) {
      newPlayerData = {
        id: '1',
        elo: eloValue,
        firstname: 'Player',
        lastname: 'One',
        nickname: 'Player one',
      };
      setPlayerOne?.(newPlayerData);
    } else {
      newPlayerData = {
        id: '2',
        elo: eloValue,
        firstname: 'Player',
        lastname: 'One',
        nickname: 'Player one',
      };
      setPlayerTwo?.(newPlayerData);
    }
  }

  return (
    <div className={styles.EloInputCard}>
      <div className={styles.EloInputCard__sideWrapper}>
        <h4>Select first Player</h4>
        {ifCustomFirst ? (
          <input
            type="number"
            min="0"
            max="3000"
            onChange={(e) => {
              adjustCustomElo(1, +e.target.value);
            }}
            className={styles.EloInputCard__customElo}
          ></input>
        ) : (
          <PlayersDropdown playersList={playersList} setPlayer={setPlayerOne}></PlayersDropdown>
        )}
        <div className="">
          <input type="checkbox" name="player-one-check" onChange={() => handleCustomCheck(1)} />
          <label htmlFor="player-one-check"> Custom ELO</label>
          <br></br>
        </div>
      </div>
      <div className={styles.EloInputCard__sideWrapper}>
        <h4>Select second Player</h4>
        {ifCustomSecond ? (
          <input
            type="number"
            min="0"
            onChange={(e) => {
              adjustCustomElo(2, +e.target.value);
            }}
            max="3000"
            className={styles.EloInputCard__customElo}
          ></input>
        ) : (
          <PlayersDropdown playersList={playersList} setPlayer={setPlayerTwo}></PlayersDropdown>
        )}
        <div className="">
          <input type="checkbox" name="player-two-check" onChange={() => handleCustomCheck(2)} />
          <label htmlFor="player-two-check"> Custom ELO</label>
          <br></br>
        </div>
      </div>
    </div>
  );
}
