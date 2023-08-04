import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '..//firebase-config';

export async function findEventById(id: string) {
  const eventsRef = collection(db, 'events');
  const queryEvent = query(eventsRef, where('id', '==', id));
  const querySnapshot = await getDocs(queryEvent);
  return querySnapshot.docs[0].id;
}
