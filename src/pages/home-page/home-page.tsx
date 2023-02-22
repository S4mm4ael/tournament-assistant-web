import { UsersList } from 'components/users-list';
import { EventsList } from 'components/events-list';
import React from 'react';

import styles from './home-page.module.css';

export function HomePage() {
  return (
    <div className={styles.MainPage}>
      <UsersList />
      <EventsList />
    </div>
  );
}
