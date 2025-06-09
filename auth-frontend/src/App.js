import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'signup') {
        await axios.post(`${API}/signup`, { email, password });
        setMessage('Sign up successful! Please log in.');
        setMode('login');
      } else {
        const res = await axios.post(`${API}/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setMessage('Logged in!');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{mode === 'signup' ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {mode === 'signup' ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')} style={{ marginTop: 10 }}>
        {mode === 'signup' ? 'Already have an account? Log In' : 'No account? Sign Up'}
      </button>
      <div style={{ marginTop: 10, color: 'green' }}>{message}</div>
    </div>
  );
}

export default App; 