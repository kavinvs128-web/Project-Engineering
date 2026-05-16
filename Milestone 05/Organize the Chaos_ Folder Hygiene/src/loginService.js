import apiClient from './apiClient';

export const loginUser = async (email, password) => {
  return await apiClient.post('/login', { email, password });
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};
