import React from 'react';

import styles from './players-dropdown.module.css';
import { EloInputCardProps } from 'types/Calculator.type';
import { findPlayerById } from 'utils/find-player';

export function PlayersDropdown({ playersList, setPlayersList, setPlayer }: EloInputCardProps) {
  function handleSelect(id: string) {
    const player = findPlayerById(id, playersList);
    // if (player !== undefined) setPlayer(player);
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
