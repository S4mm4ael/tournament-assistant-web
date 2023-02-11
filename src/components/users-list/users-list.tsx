import React, { useEffect, useState } from 'react';
import { usersCol } from '../../utils/firebase-config';
import { getDocs } from 'firebase/firestore';
import { User } from 'types/User';

export function UsersList() {
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    (async () => {
      const usersDocs = await getDocs(usersCol);
      setUsers(usersDocs.docs.map((userDoc) => userDoc.data()));
    })();
  }, []);

  return (
    <div>
      <h1>Users:</h1>
      {users.map((user) => (
        <div key={user.id}>
          <ul>
            <li>Name: {user.nickname}</li>
            <li>Rating: {user.elo}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
