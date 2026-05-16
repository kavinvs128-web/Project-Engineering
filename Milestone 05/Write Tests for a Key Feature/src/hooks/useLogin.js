import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    // Validation
    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser({ email, password });
      // On success: navigate to /dashboard
      navigate('/dashboard', { state: { user: data.user } });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    handleLogin, 
    isLoading, 
    error,
    clearError: () => setError(null)
  };
};
