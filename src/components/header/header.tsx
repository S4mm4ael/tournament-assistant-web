import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/png/logo.png';

import styles from './header.module.css';

export function Header() {
  return (
    <footer>
      <div className={styles.Header}>
        <Link className={styles.Header__logo} to="/">
          <img className={styles.Header__img} src={logo} alt="logo" height="80px" />
          <p className={styles.Header__text}>
            Tournament assistant <span>web</span>
          </p>
        </Link>
      </div>
    </footer>
  );
}
