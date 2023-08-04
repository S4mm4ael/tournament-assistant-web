import React, { useState } from 'react';
import styles from './event-participants-list.module.css';
import updateEvent from 'utils/events/event-update';
import { EventType, PlayerType } from 'types/Event.type';

interface EventParticipantsListProps {
  event: EventType;
}
export function EventParticipantsList(props: EventParticipantsListProps) {
  const [participants, setParticipants] = useState<PlayerType[]>();
  const [eventToUpdate, setEventToUpdate] = useState(props.event);

  function handlePlayerAdding() {}
  function handleUpdateEvent() {
    updateEvent(eventToUpdate);
  }

  return (
    <div className={styles.EventParticipantsList}>
      <button onClick={() => handlePlayerAdding()}>Click</button>
    </div>
  );
}
