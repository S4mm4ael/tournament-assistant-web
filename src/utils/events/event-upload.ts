import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import { EventType } from 'types/Event.type';

export default async function uploadEvent(event: EventType | undefined) {
  if (event) {
    const docRef = await addDoc(collection(db, 'events'), event);
    return docRef;
  }
}
