import React, { useEffect, useState } from 'react';
import { UserType } from 'types/User.type';
import styles from './users-list.module.css';
import { User } from 'components/user';
import getUsersList from 'utils/users/users-get-list';

export function UsersList() {
  const [users, setUsers] = useState<Array<UserType>>([]);

  useEffect(() => {
    (async () => {
      setUsers(await getUsersList());
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
      <h2 className={styles.UsersList__title}>Users</h2>
      <ul className={styles.UsersList__list}>{renderUser()}</ul>
    </div>
  );
}
