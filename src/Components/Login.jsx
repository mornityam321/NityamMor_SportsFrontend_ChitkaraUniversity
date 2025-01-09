import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Login.css'; 

const Login = () => {
  const { loginWithPopup, isAuthenticated, user } = useAuth0();

  return (
    <div className="login-container">
      <h2>Auth0 Login</h2>
      {!isAuthenticated ? (
        <>
          <button className="login-button google" onClick={() => loginWithPopup({ connection: 'google-oauth2' })}>
            Sign in with Google
          </button>
          <button className="login-button github" onClick={() => loginWithPopup({ connection: 'github' })}>
            Sign in with GitHub
          </button>
        </>
      ) : (
        <h3>Welcome, {user.name}</h3>
      )}
    </div>
  );
};

export default Login;
