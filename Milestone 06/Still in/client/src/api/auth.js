import client from './client';

export const signup = async (email, password) => {
  const response = await client.post('/signup', { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await client.post('/login', { email, password });
  return response.data;
};
