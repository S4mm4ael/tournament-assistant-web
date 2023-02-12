import { UsersList } from 'components/users-list';
import { EventsList } from 'components/events-list';
import React from 'react';

export function HomePage() {
  return (
    <div className="MainPage">
      <UsersList />
      <EventsList />
    </div>
  );
}
