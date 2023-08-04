import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { findEventById } from './event-find-by-id';

export async function deleteEvent(idFirebase: string) {
  const idToDelete = await findEventById(idFirebase);
  await deleteDoc(doc(db, 'events', idToDelete));
}
