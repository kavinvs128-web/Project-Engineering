import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor to add Authorization header
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// INTENTIONAL MISSING INTERCEPTOR:
// The student should implement a response interceptor to handle 401 status.
// Currently, error handling is left to the individual components.

export default client;
