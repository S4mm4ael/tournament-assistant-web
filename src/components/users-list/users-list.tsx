import React, { useEffect, useState } from 'react';
import { usersCol } from '../../utils/firebase-config';
import { getDocs } from 'firebase/firestore';
import { User } from 'types/User';

export function UsersList() {
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersDocs = await getDocs(usersCol);
      usersDocs.docs.forEach((userDoc) => {
        const user = userDoc.data();
        setUsers((prevState) => [...prevState, user]);
      });
    };
    getUsers();
  }, []);
  return (
    <div>
      <h1>Users:</h1>
      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <ul>
                <li>Name: {user.nickname}</li>
                <li>Rating: {user.elo}</li>
              </ul>
              <br />
            </div>
          );
        })}
    </div>
  );
}
