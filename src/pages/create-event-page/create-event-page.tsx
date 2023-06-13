import React, { useEffect, useState } from 'react';
import styles from './create-event-page.module.css';
import { getAuth } from 'firebase/auth';
import { EventType } from 'types/Event.type';
import generateID from 'helpers/generateID';

export function CreateEventPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email;
  const isAdmin = email === 'homer1996@gmail.com';
  const [eventInfo, setEventInfo] = useState<EventType>({
    date: ' ',
    description: null,
    elo: null,
    id: ' ',
    name: ' ',
    pts: 2000,
    tours: 3,
    type: 'SOLO',
    link: '',
  });
  const [eventDate, setEventDate] = useState(eventInfo.date);
  const [eventDescription, setEventDescription] = useState(eventInfo.description);
  const [eventELO, setEventELO] = useState(eventInfo.elo);
  const [eventID, setEventID] = useState(generateID());
  const [eventName, setEventName] = useState(eventInfo.name);
  const [eventPts, setEventPts] = useState(eventInfo.pts);
  const [eventTours, setEventTours] = useState(eventInfo.tours);
  const [eventLink, setEventLink] = useState(eventInfo.link);
  const [eventType, setEventType] = useState(eventInfo.type);

  function handleFormSubmit() {
    const newEventInfo: EventType = {
      date: eventDate,
      description: eventDescription,
      elo: eventELO,
      id: eventID,
      name: eventName,
      pts: eventPts,
      tours: eventTours,
      type: eventType,
      link: eventLink,
    };
    console.log(newEventInfo);
    setEventInfo(newEventInfo);
  }

  return (
    <div className={styles.CreateEventPage}>
      {isAdmin && (
        <>
          <h1> Create event</h1>
          <span className="id">{eventID}</span>
          <form
            className={styles.CreateEventPage__inputForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <div className={styles.CreateEventPage__inputContainer}>
              <label htmlFor="date">Date</label>
              <input
                className={styles.CreateEventPage__inputDate}
                type="date"
                id="date"
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className={styles.CreateEventPage__inputContainer}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" onChange={(e) => setEventName(e.target.value)} />
            </div>
            <div className={styles.CreateEventPage__inputContainer}>
              <label htmlFor="Description">Description</label>
              <textarea
                id="Description"
                onChange={(e) => setEventDescription(e.target.value)}
                className={styles.CreateEventPage__inputDescription}
              />
            </div>
            <div className={styles.CreateEventPage__inputContainer}>
              <p>Points</p>
              <select
                className={styles.CreateEventPage__inputSelect}
                name="points"
                id="points"
                value={eventPts.toString()}
                onChange={(e) => setEventPts(+e.target.value)}
              >
                <option value="1000">1000</option>
                <option value="1250">1250</option>
                <option value="1500">1500</option>
                <option value="2000">2000</option>
              </select>
            </div>
            <input
              type="submit"
              value="Submit"
              className={styles.CreateEventPage__inputSubmit}
            ></input>
          </form>
        </>
      )}
      {!isAdmin && <p> You dont have a permission to create event, contact admins</p>}
    </div>
  );
}
