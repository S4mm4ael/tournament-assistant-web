import React, { useState } from 'react';
import styles from './create-event-page.module.css';
import { getAuth } from 'firebase/auth';
import { EventType } from 'types/Event.type';
import generateID from 'helpers/generateID';
import uploadEvent from 'utils/upload-event';
import { useNavigate } from 'react-router-dom';

export function CreateEventPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email;
  const isAdmin = email === 'homer1996@gmail.com';
  //const isAdmin = true;

  const [eventDate, setEventDate] = useState<string>(String(new Date()));
  const [eventDescription, setEventDescription] = useState<string>();
  const [eventELO, setEventELO] = useState<number>(2500);
  const [eventID, setEventID] = useState(generateID());
  const [eventName, setEventName] = useState<string>();
  const [eventPts, setEventPts] = useState<number>(2000);
  const [memberNumber, setMemberNumber] = useState<number>();
  const [eventTours, setEventTours] = useState<number>(3);
  const [eventLink, setEventLink] = useState<string>();
  const [eventType, setEventType] = useState<string>('SOLO');
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleFormSubmit() {
    const newEventInfo: EventType = await {
      date: eventDate,
      description: eventDescription,
      elo: eventELO,
      id: eventID,
      name: eventName,
      pts: eventPts,
      tours: eventTours,
      type: eventType,
      link: eventLink,
      memberNumber: memberNumber,
    };
    uploadEvent(newEventInfo)
      .then(() => setUploadStatus(true))
      .then(() => alert('Event is created!'))
      .then(() => navigate('/'));
  }

  return (
    <div className={styles.CreateEventPage}>
      {isAdmin && (
        <>
          <h1> Create event</h1>
          <div className={styles.CreateEventPage__baseInfo}>
            <span className="id">ID - {eventID}</span>
            <span className="id">Organizer - {user?.email}</span>
          </div>
          <form
            className={styles.CreateEventPage__inputForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <div className={styles.CreateEventPage__inputContainer}>
              <label htmlFor="date">
                Date<span>*</span>
              </label>
              <input
                className={styles.CreateEventPage__inputDate}
                type="date"
                id="date"
                onChange={(e) => setEventDate(e.target.value)}
                required={true}
              />
            </div>
            <div className={styles.CreateEventPage__inputContainer}>
              <label htmlFor="name">
                Name<span>*</span>
              </label>
              <input
                type="text"
                id="name"
                className={styles.CreateEventPage__inputText}
                onChange={(e) => setEventName(e.target.value)}
                required={true}
              />
            </div>
            <div
              className={`${styles.CreateEventPage__inputContainer} ${styles.CreateEventPage__inputContainer_description}`}
            >
              <label htmlFor="Description">
                Description<span>*</span>
              </label>
              <textarea
                id="Description"
                onChange={(e) => setEventDescription(e.target.value)}
                className={styles.CreateEventPage__inputDescription}
                required={true}
              />
              <label htmlFor="link">
                Reglament link<span>*</span>
              </label>
              <input
                type="text"
                id="link"
                className={styles.CreateEventPage__inputLink}
                onChange={(e) => setEventLink(e.target.value)}
                required={true}
              />
            </div>
            <div className={styles.CreateEventPage__inputContainer}>
              <p>Event type</p>
              <select
                className={styles.CreateEventPage__inputSelect}
                name="type"
                id="type"
                value={eventType.toString()}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="SOLO">SOLO</option>
                <option value="TEAM">TEAM</option>
                <option value="PAIRS">PAIRS</option>
              </select>
            </div>
            <div className={styles.CreateEventPage__inputContainer}>
              <label>
                Points<span>*</span>
              </label>
              <select
                className={styles.CreateEventPage__inputSelect}
                name="points"
                id="points"
                value={eventPts.toString()}
                onChange={(e) => setEventPts(+e.target.value)}
                required={true}
              >
                <option value="1000">1000</option>
                <option value="1250">1250</option>
                <option value="1500">1500</option>
                <option value="2000">2000</option>
              </select>
            </div>
            <div className={styles.CreateEventPage__inputContainer}>
              <label htmlFor="elo">Max ELO</label>
              <input
                type="number"
                min={0}
                max={3000}
                id="elo"
                className={styles.CreateEventPage__inputNumber}
                onChange={(e) => setEventELO(+e.target.value)}
              />
            </div>
            <div className={styles.CreateEventPage__inputContainer}>
              <label htmlFor="players">
                Max players<span>*</span>
              </label>
              <input
                type="number"
                min={0}
                max={50}
                id="players"
                className={styles.CreateEventPage__inputNumber}
                onChange={(e) => setMemberNumber(+e.target.value)}
                required={true}
              />
            </div>

            <div className={styles.CreateEventPage__inputContainer}>
              <p>Tours number</p>
              <select
                className={styles.CreateEventPage__inputSelect}
                name="status"
                id="status"
                value={eventTours.toString()}
                onChange={(e) => setEventTours(+e.target.value)}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
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
