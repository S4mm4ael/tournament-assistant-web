/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import styles from './elo-input-card.module.css';
import { PlayersDropdown } from 'components/players-dropdown';
import { EloInputCardProps } from 'types/Calculator.type';

export function EloInputCard({
  playersList,
  setPlayersList,
  setPlayerOne,
  setPlayerTwo,
}: EloInputCardProps) {

  const [ifCustomFirst, setIfCustomFirst] = useState(false)
  const [ifCustomSecond, setIfCustomSecond] = useState(false)

  function handleCustomCheck(playerNum: number) {

    if (playerNum === 1) {
      ifCustomFirst ? setIfCustomFirst(false) : setIfCustomFirst(true)
    }
    else {
      ifCustomSecond ? setIfCustomSecond(false) : setIfCustomSecond(true)
    }
    console.log()
  }


  return <div className={styles.EloInputCard}>
    <div className={styles.EloInputCard__sideWrapper}>
      <h4>Select first Player</h4>
      {ifCustomFirst ? <input type='number'
        min="0"
        max="3000"
        className={styles.EloInputCard__customElo}></input> :
        <PlayersDropdown playersList={playersList}
          setPlayersList={setPlayersList}
          setPlayer={setPlayerOne}
        ></PlayersDropdown>}
      <div className=""><input type="checkbox" name="player-one-check" onChange={() => handleCustomCheck(1)} />
        <label htmlFor="player-one-check"> Custom ELO</label><br></br></div>

    </div>
    <div className={styles.EloInputCard__sideWrapper}>
      <h4>Select second Player</h4>
      {ifCustomSecond ? <input type='number' min="0"
        max="3000"
        className={styles.EloInputCard__customElo}></input> :
        <PlayersDropdown playersList={playersList}
          setPlayersList={setPlayersList}
          setPlayer={setPlayerTwo}
        ></PlayersDropdown>}
      <div className="">
        <input type="checkbox" name="player-two-check" onChange={() => handleCustomCheck(2)} />
      <label htmlFor="player-two-check"> Custom ELO</label><br></br>
      </div>      

    </div>
  </div>;
}
