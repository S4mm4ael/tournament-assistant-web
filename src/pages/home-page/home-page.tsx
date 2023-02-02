import { UsersList } from 'components/users-list';
import { TournamentsList } from 'components/tournaments-list';
import React from 'react';

export function HomePage() {
  return (
    <div>
      <UsersList />
      <TournamentsList />
    </div>
  );
}
