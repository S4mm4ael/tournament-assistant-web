import { getDocs } from 'firebase/firestore';
import { eventsCol } from '..//firebase-config';

export default async function getEventsList() {
  const eventsDocs = await getDocs(eventsCol);
  return eventsDocs.docs.map((eventDoc) => eventDoc.data());
}
