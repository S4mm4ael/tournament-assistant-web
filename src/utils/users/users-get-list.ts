import { getDocs } from 'firebase/firestore';
import { usersCol } from '..//firebase-config';

export default async function getUsersList() {
  const usersDocs = await getDocs(usersCol);
  return usersDocs.docs.map((userDoc) => userDoc.data());
}
