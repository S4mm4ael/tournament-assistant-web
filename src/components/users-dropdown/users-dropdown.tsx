import React, { useEffect, useState } from 'react';
import { UserType } from 'types/User.type';
import getUsersList from 'utils/users/users-get-list';

import styles from './users-dropdown.module.css';

export function UsersDropdown() {
  const [usersList, setUsersList] = useState<Array<UserType>>();

  useEffect(() => {
    (async () => {
      setUsersList(await getUsersList());
    })();
  }, []);

  function handleSelect(id: string) {
    console.log(id);
  }

  return (
    <div>
      {usersList && (
        <select className={styles.UsersDropdown} onChange={(e) => handleSelect(e.target.value)}>
          <option>Select user</option>
          {usersList.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstname} {user.nickname ?? ' '} {user.lastname}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
