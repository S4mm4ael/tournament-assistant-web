import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { collection, CollectionReference, DocumentData } from 'firebase/firestore';
import { UserType } from 'types/User.type';
import { EventType } from 'types/Event.type';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_IP}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const usersCol = createCollection<UserType>('users');
export const eventsCol = createCollection<EventType>('events');
