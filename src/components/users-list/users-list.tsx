import React, { useState } from 'react';
import { EnumType } from 'typescript';
import styles from './players-list.module.css';

type UsersProps = {
  elo: number;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  userType: EnumType;
};

export function UsersList() {
  const [users, setUsers] = useState();

  return <div>PlayersList</div>;
}
