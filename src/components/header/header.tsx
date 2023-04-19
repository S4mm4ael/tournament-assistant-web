import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import logo from '../../assets/png/logo.png';

import styles from './header.module.css';

export function Header() {
  const auth = getAuth();

  return (
    <header>
      <div className={styles.Header}>
        <Link className={styles.Header__logo} to="/">
          <img className={styles.Header__img} src={logo} alt="logo" height="80px" />
          <p className={styles.Header__text}>
            Tournament assistant <span>web</span>
          </p>
        </Link>
        <div className={styles.Header__linkContainer}>
          <Link className={styles.Header__link} to={'/registration'}>
            Sign up
          </Link>
          <Link className={styles.Header__link} to={'/login'}>
            Sign in
          </Link>
          <button
            type="button"
            className={`${styles.Header__link} ${styles.Header__link_button}`}
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                })
                .catch((error) => {
                  // An error happened.
                });
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
