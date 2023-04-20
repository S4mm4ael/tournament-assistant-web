import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useController, useForm } from 'react-hook-form';

import styles from './registration-page.module.css';

export function RegistrationPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hasOnlyLatinAndNumbers = (value: string) => /^[a-zA-Z0-9]*$/.test(value);
  const hasLatinSymbol = (value: string) => /[a-zA-Z]/.test(value);
  const hasUpperCaseLetter = (value: string) => /[A-ZА-Я]/.test(value);
  const hasNumber = (value: string) => /\d+/.test(value);
  const minLength = (value: string) => /^(?=.*\d).{8,}$/.test(value);

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
      },
    },
  });
  const onSubmit = () => {
    if (!emailFieldState.invalid && !passwordFieldState.invalid) {
      setEmail(emailField.value);
      setPassword(passwordField.value);
      registrationWithPassword();
    }
  };
  async function registrationWithPassword() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  }

  return (
    <div className={styles.RegistrationPage}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.RegistrationPage__inputWrapper}>
          <input
            className={styles.RegistrationPage__formItem}
            key="email"
            {...emailField}
            value={emailField.value || ''}
            type="text"
            required={true}
          />
          <span className={styles.RegistrationPage__placeholder}>E-mail</span>
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
          <input
            key="password"
            id="password"
            {...passwordField}
            value={passwordField.value || ''}
            onChange={passwordField.onChange}
            className={styles.RegistrationPage__formItem}
            type={'password'}
            required={true}
            autoFocus={true}
          />
          <span className={styles.RegistrationPage__placeholder}>Password</span>
        </div>

        <button className={styles.RegistrationPage__formButton} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
