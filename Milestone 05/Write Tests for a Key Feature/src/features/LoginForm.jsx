import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { Mail, Lock, LogIn } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, isLoading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <section className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 ml-1">
            Email
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 ml-1">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="pt-2 animate-in fade-in slide-in-from-top-1">
            <ErrorMessage message={error} />
          </div>
        )}

        <div className="pt-4">
          <Button
            label="Sign In"
            type="submit"
            loading={isLoading}
            className="w-full py-4 text-lg"
          />
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
