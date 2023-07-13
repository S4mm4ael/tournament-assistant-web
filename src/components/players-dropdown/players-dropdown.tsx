import React from 'react';

import styles from './players-dropdown.module.css';
import { EloInputCardProps } from 'types/Calculator.type';

export function PlayersDropdown({ playersList, setPlayer }: EloInputCardProps) {
  function handleSelect(id: string) {
    const player = playersList.find((player) => player.id === id);
    if (player != undefined) {
      setPlayer?.(player);
    }

    console.log(player);
  }

  return (
    <select className={styles.PlayersDropdown} onChange={(e) => handleSelect(e.target.value)}>
      {playersList.map((player) => (
        <option key={player.id} value={player.id}>
          {player.nickname}
        </option>
      ))}
    </select>
  );
}
