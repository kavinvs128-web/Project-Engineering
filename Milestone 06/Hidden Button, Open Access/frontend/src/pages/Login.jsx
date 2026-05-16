import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      login(data.user, data.token);
      navigate('/products');
    } catch (err) {
      setError('Network error — is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  function quickFill(role) {
    setEmail(`${role}@shopadmin.com`);
    setPassword('password123');
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🛍️</div>
        <h1 className="auth-title">ShopAdmin</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <form id="login-form" onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button id="btn-login-submit" type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="quick-fill">
          <p>Quick fill:</p>
          <button id="btn-fill-admin" className="btn btn-ghost btn-sm" onClick={() => quickFill('admin')}>
            Admin account
          </button>
          <button id="btn-fill-customer" className="btn btn-ghost btn-sm" onClick={() => quickFill('customer')}>
            Customer account
          </button>
        </div>
      </div>
    </div>
  );
}
