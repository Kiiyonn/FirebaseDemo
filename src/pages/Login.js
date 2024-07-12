import React, { useState } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reference the users document in the accounts collection
    const userDoc = doc(db, 'accounts', 'users');
    const snapshot = await getDoc(userDoc);

    if (!snapshot.exists()) {
      setError('User not found');
      return;
    }

    const userData = snapshot.data();

    // Check if username and password match
    // username = admin1 and password = 123
    if (userData.username === username && userData.password === password) {
      navigate('/home'); // Redirect to home on successful login
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
