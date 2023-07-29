import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import styles from './login-page.module.css';

export function LoginPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [password, setPassword] = useState('95161913');
  const [email, setEmail] = useState('homer1996@gmail.com');
  const [errorMessage, setErrorMessage] = useState('');

  async function signInWithPassword() {
    setAuthing(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        setAuthing(false);
      });
  }

  return (
    <div className={styles.LoginPage}>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithPassword();
        }}
      >
        <div className={styles.LoginPage__ItemWrapper}>
          <div className={styles.LoginPage__inputWrapper}>
            <label htmlFor="e-mail" className={styles.LoginPage__placeholder}>
              E-mail
            </label>
            <input
              className={styles.LoginPage__formItem}
              required={true}
              autoFocus={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="true"
              id="e-mail"
            />
          </div>
          <div className={styles.LoginPage__inputWrapper}>
            <label htmlFor="password" className={styles.LoginPage__placeholder}>
              Password
            </label>
            <input
              className={styles.LoginPage__formItem}
              required={true}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="true"
              id="password"
            />
          </div>
        </div>
        <button className={styles.LoginPage__formButton} type="submit" disabled={authing}>
          Login
        </button>
      </form>
      {errorMessage && <p>Sorry, {errorMessage.slice(22).slice(0, -2).replace(/-/g, ' ')}</p>}
      <Link className={styles.LoginPage__registrationLink} to="/registration">
        Registration
      </Link>
    </div>
  );
}
