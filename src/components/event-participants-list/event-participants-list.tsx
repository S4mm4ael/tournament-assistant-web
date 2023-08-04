import React, { useState } from 'react';
import styles from './event-participants-list.module.css';
import updateEvent from 'utils/events/event-update';
import { EventType, PlayerType } from 'types/Event.type';
import { UsersDropdown } from 'components/users-dropdown';

interface EventParticipantsListProps {
  event: EventType;
}
export function EventParticipantsList(props: EventParticipantsListProps) {
  const [participants, setParticipants] = useState<PlayerType[] | undefined>(
    props.event.appliedPlayers
  );
  const [eventToUpdate, setEventToUpdate] = useState(props.event);

  function handlePlayerAdding() {}
  function handleUpdateEvent() {
    updateEvent(eventToUpdate);
  }
  function renderParticipantsList() {
    if (participants) {
      return <>participants</>;
    }
    return <span>Please, add first player</span>;
  }

  return (
    <div className={styles.EventParticipantsList}>
      <div className={styles.EventParticipantsList__participants}>{renderParticipantsList()}</div>
      {/* <UsersDropdown /> */}
      <button onClick={() => handlePlayerAdding()} className={styles.EventParticipantsList__submit}>
        Submit changes
      </button>
    </div>
  );
}
