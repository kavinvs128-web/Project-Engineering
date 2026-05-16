import client from './client';

export const getPoll = async () => {
  const response = await client.get('/poll');
  return response.data;
};

export const vote = async (optionId) => {
  const response = await client.post('/vote', { optionId });
  return response.data;
};
