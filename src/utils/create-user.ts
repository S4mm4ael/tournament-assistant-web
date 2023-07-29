import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase-config';
import { UserType } from 'types/User.type';

export default async function createUser(user: UserType) {
  const docRef = await addDoc(collection(db, 'users'), user);
  return docRef;
}
