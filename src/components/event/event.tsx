import React from 'react';
import { Link } from 'react-router-dom';
import { EventType } from 'types/Event.type';
import styles from './event.module.css';

export function Event(props: EventType) {
  return (
    <Link to={`/event/:${props.id}`}>
      <div className={styles.Event}>
        <li>{props.name}</li>
        <li>Date: {props.date.toString()}</li>
        <li>Format: {props.type}</li>
        <li>pts: {props.pts}</li>
      </div>
    </Link>
  );
}
