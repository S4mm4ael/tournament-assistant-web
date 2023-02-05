import React, { useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

// enum ETypeUser {
//   admin = 'ADMIN',
//   org = 'ORG',
//   player = 'PLAYER',
// }

// type UsersProps = {
//   elo: number;
//   email: string;
//   firstname: string;
//   id: string;
//   lastname: string;
//   nickname: string;
//   userType: ETypeUser;
// };

export function UsersList() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <div>
      <h1>Users:</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            {' '}
            <p>Name: {user.nickname}</p>
            <p>Rating: {user.elo}</p>
          </div>
        );
      })}
    </div>
  );
}
