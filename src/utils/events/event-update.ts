import { doc, setDoc } from 'firebase/firestore';
import { EventType } from 'types/Event.type';
import { db } from '..//firebase-config';
import { findEventById } from './event-find-by-id';

export default async function updateEvent(event: EventType) {
  const documentId = await findEventById(event.id);
  setDoc(doc(db, 'events', documentId), event);
}
