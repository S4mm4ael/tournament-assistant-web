import React from 'react';

import styles from './players-dropdown.module.css';
import { EloInputCardProps } from 'types/Calculator.type';

export function PlayersDropdown({
  playersList,
  setPlayersList,
  setPlayerOne,
  setPlayerTwo,
}: EloInputCardProps) {
  return <div className={styles.PlayersDropdown}>here will be drops</div>;
}
