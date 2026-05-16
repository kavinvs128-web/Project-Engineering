import React, { useState } from 'react';
import api from '../services/api';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', { email, name, password });
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="auth-page animate-in">
      <div className="card">
        <h2>Join the Hub</h2>
        <p>Create an account to start collaborating.</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
