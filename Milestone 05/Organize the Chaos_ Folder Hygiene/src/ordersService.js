import apiClient from './apiClient';

export const getOrders = async () => {
  return await apiClient.get('/orders');
};
