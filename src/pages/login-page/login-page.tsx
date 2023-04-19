import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const password = '95161913';
  const email = 'homer1996@gmail.com';

  async function signInWithPassword() {
    setAuthing(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setAuthing(false);
      });
  }

  return (
    <>
      <h1>Login page</h1>;
      <button type="button" onClick={() => signInWithPassword()} disabled={authing}>
        Sign in with Email and Password
      </button>
    </>
  );
}
