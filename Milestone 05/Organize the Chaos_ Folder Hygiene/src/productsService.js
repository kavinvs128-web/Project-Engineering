import apiClient from './apiClient';

export const getProducts = async () => {
  return await apiClient.get('/products');
};

export const getProductById = async (id) => {
  const products = await apiClient.get('/products');
  return products.find(p => p.id === id);
};
