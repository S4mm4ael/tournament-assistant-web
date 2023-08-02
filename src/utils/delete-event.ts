import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase-config';
import { findEventById } from './find-event-by-id';

export async function deleteEvent(idFirebase: string) {
  const idToDelete = await findEventById(idFirebase);
  await deleteDoc(doc(db, 'events', idToDelete));
}
