import React from 'react';
import styles from './event-participants-list.module.css';
import updateEvent from 'utils/update-event';
import { EventType } from 'types/Event.type';

interface EventParticipantsListProps {
  event: EventType;
}
export function EventParticipantsList(props: EventParticipantsListProps) {
  function handlePlayerAdding() {
    updateEvent(props.event);
  }

  return (
    <div className={styles.EventParticipantsList}>
      <button onClick={() => handlePlayerAdding()}>Click</button>
    </div>
  );
}
