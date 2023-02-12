import React from 'react';
import { UserType } from 'types/User';
import styles from './user.module.css';

export function User(props: UserType) {
  return (
    <div className={styles.User}>
      <li>
        Player: {props.lastname} {props.firstname}
      </li>
      <li>Nickname: {props.nickname}</li>
      <li>Rating: {props.elo}</li>
    </div>
  );
}
