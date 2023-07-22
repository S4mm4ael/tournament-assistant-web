import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase-config';
import { EventType } from 'types/Event.type';

export default function uploadEvent(event: EventType) {
  addDoc(collection(db, 'events'), event);
  console.log('Document written');
}
