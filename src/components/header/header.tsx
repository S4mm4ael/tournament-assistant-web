import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import logo from '../../assets/png/logo.png';

import styles from './header.module.css';

export function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

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
          {!user && (
            <>
              <Link className={styles.Header__link} to={'/registration'}>
                Sign up
              </Link>
              <Link className={styles.Header__link} to={'/login'}>
                Sign in
              </Link>
            </>
          )}

          {user && (
            <button
              type="button"
              className={`${styles.Header__link} ${styles.Header__link_button}`}
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    navigate('/');
                    localStorage.removeItem('user');
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
