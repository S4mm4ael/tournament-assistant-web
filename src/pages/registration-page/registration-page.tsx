import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useController, useForm } from 'react-hook-form';

import styles from './registration-page.module.css';
import createUser from 'utils/users/user-create';
import generateID from 'helpers/generateID';

export function RegistrationPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');

  const hasUpperCaseLetter = (value: string) => /[A-ZА-Я]/.test(value);
  const hasNumber = (value: string) => /\d+/.test(value);
  const minLength = (value: string) => /^(?=.*\d).{8,}$/.test(value);
  const equalToPassword = (value: string) => value == passwordField.value;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const { field: emailField, fieldState: emailFieldState } = useController({
    name: 'email',
    control,
    rules: {
      required: true,
      pattern: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
  });

  const { field: passwordField, fieldState: passwordFieldState } = useController({
    name: 'password',
    control,
    rules: {
      required: true,
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      validate: {
        hasUpperCaseLetter,
        hasNumber,
        minLength,
      },
    },
  });

  const { field: repeatField, fieldState: repeatFieldState } = useController({
    name: 'repeat-password',
    control,
    rules: {
      required: true,
      validate: {
        equalToPassword,
      },
    },
  });

  const onSubmit = () => {
    if (!emailFieldState.invalid && !passwordFieldState.invalid && !repeatFieldState.invalid) {
      setEmail(emailField.value);
      setPassword(passwordField.value);
      registrationWithPassword();
    }
  };
  async function registrationWithPassword() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userToCreate = {
          id: generateID(),
          elo: 1700,
          email: email,
          firstname: firstName,
          lastname: lastName,
          nickname: nickname,
          userType: ['PLAYER'],
        };
        const user = userCredential.user;

        localStorage.setItem('user', JSON.stringify(user));

        createUser(userToCreate);

        alert('User is created!');
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(error.message);
        console.log(error);
        // ..
      });
  }

  return (
    <div className={styles.RegistrationPage}>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.RegistrationPage__inputWrapper}>
          <label htmlFor="first-name" className={styles.RegistrationPage__placeholder}>
            First name
          </label>
          <input
            className={styles.RegistrationPage__formItem}
            key="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            required={true}
            id="first-name"
          />
        </div>
        <div className={styles.RegistrationPage__inputWrapper}>
          <label htmlFor="last-name" className={styles.RegistrationPage__placeholder}>
            Last name
          </label>
          <input
            className={styles.RegistrationPage__formItem}
            key="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            required={true}
            id="last-name"
          />
        </div>
        <div className={styles.RegistrationPage__inputWrapper}>
          <label htmlFor="nickname" className={styles.RegistrationPage__placeholder}>
            Nickname
          </label>
          <input
            className={styles.RegistrationPage__formItem}
            key="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            type="text"
            required={true}
            id="nickname"
          />
        </div>
        <div className={styles.RegistrationPage__inputWrapper}>
          <label htmlFor="e-mail" className={styles.RegistrationPage__placeholder}>
            E-mail
          </label>
          <input
            className={styles.RegistrationPage__formItem}
            key="email"
            {...emailField}
            value={emailField.value || ''}
            type="text"
            required={true}
            id="e-mail"
          />

          {!emailFieldState.invalid && <p className={styles.RegistrationPage__formTips}></p>}
          {emailFieldState.invalid && (
            <p
              className={`${styles.RegistrationPage__formTips} ${styles.RegistrationPage__formTips_error}`}
            >
              Enter correct e-mail
            </p>
          )}
        </div>
        <div className={styles.RegistrationPage__inputWrapper}>
          <label htmlFor="password" className={styles.RegistrationPage__placeholder}>
            Password
          </label>
          <input
            key="password"
            id="password"
            {...passwordField}
            value={passwordField.value || ''}
            onChange={passwordField.onChange}
            className={styles.RegistrationPage__formItem}
            type={'password'}
            required={true}
          />
          {!passwordFieldState.invalid && <p className={styles.RegistrationPage__formTips}></p>}
          {passwordFieldState.invalid && (
            <p
              className={`${styles.RegistrationPage__formTips} ${styles.RegistrationPage__formTips_error}`}
            >
              Password must be at least 8 characters, has upper case letter and has a number.
            </p>
          )}
        </div>
        <div className={styles.RegistrationPage__inputWrapper}>
          <label htmlFor="repeat-password" className={styles.RegistrationPage__placeholder}>
            Repeat password
          </label>
          <input
            key="repeat-password"
            id="repeat-password"
            {...repeatField}
            value={repeatField.value || ''}
            onChange={repeatField.onChange}
            className={styles.RegistrationPage__formItem}
            type={'password'}
            required={true}
          />
          {!repeatFieldState.invalid && <p className={styles.RegistrationPage__formTips}></p>}
          {repeatFieldState.invalid && (
            <p
              className={`${styles.RegistrationPage__formTips} ${styles.RegistrationPage__formTips_error}`}
            >
              Passwords arent equal
            </p>
          )}
        </div>
        <button className={styles.RegistrationPage__formButton} type="submit">
          Sign up
        </button>
        {errorMessage && <p className={styles.RegistrationPage__errorMessage}>{errorMessage}</p>}
      </form>
    </div>
  );
}
