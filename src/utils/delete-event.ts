import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from './firebase-config';

export async function deleteEvent(idFirebase: string) {
  const idToDelete = await findEventById(idFirebase);
  await deleteDoc(doc(db, 'events', idToDelete));
}

async function findEventById(id: string) {
  console.log(id);
  const eventsRef = collection(db, 'events');
  const queryEvent = query(eventsRef, where('id', '==', id));
  const querySnapshot = await getDocs(queryEvent);
  return querySnapshot.docs[0].id;
}
