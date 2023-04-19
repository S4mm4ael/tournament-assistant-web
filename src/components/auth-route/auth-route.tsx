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
  }, [auth]);

  const AuthCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoading(false);
    } else {
      console.log('unauth');
      navigate('./login');
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return <div>{children}</div>;
}
