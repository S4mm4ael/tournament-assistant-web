import React from 'react';
import styles from './burger-menu.module.css';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export function Burger() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleClick = () => {
    if (!isBurgerOpen) {
      setIsBurgerOpen(true);
    }
    if (isBurgerOpen) {
      setIsBurgerOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        id="burger-button"
        className={`${styles.Burger}  ${isBurgerOpen ? styles.Burger_open : ''}`}
        onClick={() => handleClick()}
      >
        <span className={styles.Burger__line} />
        <span className={styles.Burger__line} />
        <span className={styles.Burger__line} />
      </button>
      {isBurgerOpen && (
        <div
          onClick={() => handleClick()}
          className={`${styles.Burger__menu} ${isBurgerOpen ? styles.Burger___menu_open : ''}`}
        >
          <Link className={styles.Burger__menu__link} to={'/'}>
            Main page
          </Link>
          <Link className={styles.Burger__menu__link} to={'/calculator'}>
            ELO calculator
          </Link>
          {!user && (
            <>
              <Link className={styles.Burger__menu__link} to={'/registration'}>
                Sign up
              </Link>
              <Link className={styles.Burger__menu__link} to={'/login'}>
                Sign in
              </Link>
            </>
          )}

          {user && (
            <>
              {user.email === 'homer1996@gmail.com' && (
                <Link className={styles.Burger__menu__link} to={'/create-event'}>
                  Create Event
                </Link>
              )}
              <button
                type="button"
                className={`${styles.Burger__menu__link} ${styles.Burger__menu__link_button}`}
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
            </>
          )}
        </div>
      )}
    </>
  );
}
