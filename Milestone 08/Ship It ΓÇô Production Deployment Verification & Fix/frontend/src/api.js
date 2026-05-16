const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchItems = async () => {
  const response = await fetch(`${API_URL}/api/items`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
};

export const fetchHealth = async () => {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) {
    throw new Error('Health Check Failed');
  }
  return response.json();
};
