import React from 'react';
import { Link } from 'react-router-dom';
import { EventType } from 'types/Event.type';
import styles from './event.module.css';

export function Event(props: EventType) {
  return (
    <Link to={`/event/:${props.id}`}>
      <div className={styles.Event}>
        <li>
          <b>{props.name}</b>
        </li>
        <li>
          Date: <b>{props.date.toString().slice(0, 10)}</b>
        </li>
        <li>Format: {props.type}</li>
        <li>pts: {props.pts}</li>
      </div>
    </Link>
  );
}
