import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface AuthRouteProps {
  children?: JSX.Element;
}

export function AuthRoute(props: AuthRouteProps) {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AuthCheck();
    return () => AuthCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoading(false);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      navigate('./login');
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return <div>{children}</div>;
}
