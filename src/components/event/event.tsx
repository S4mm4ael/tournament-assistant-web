import React from 'react';
import { EventType } from 'types/Event.type';
import styles from './event.module.css';

export function Event(props: EventType) {
  return (
    <div className={styles.Event}>
      <li>{props.name}</li>
      <li>Date: {props.date.toString()}</li>
      <li>Format: {props.type}</li>
      <li>pts: {props.pts}</li>
    </div>
  );
}
