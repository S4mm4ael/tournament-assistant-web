import React, { useEffect, useState } from 'react';
import { usersCol } from '../../utils/firebase-config';
import { getDocs } from 'firebase/firestore';
import { UserType } from 'types/User';
import styles from './users-list.module.css';
import { User } from 'components/user';

export function UsersList() {
  const [users, setUsers] = useState<Array<UserType>>([]);

  useEffect(() => {
    (async () => {
      const usersDocs = await getDocs(usersCol);
      setUsers(usersDocs.docs.map((userDoc) => userDoc.data()));
    })();
  }, []);

  const renderUser = () => {
    return users.map((user: UserType) => (
      <User
        key={user.id}
        id={user.id}
        elo={user.elo}
        firstname={user.firstname}
        lastname={user.lastname}
        nickname={user.nickname}
      />
    ));
  };

  return (
    <div className={styles.UsersList}>
      <h2>Users:</h2>
      <ul className={styles.UsersList__list}>{renderUser()}</ul>
    </div>
  );
}
