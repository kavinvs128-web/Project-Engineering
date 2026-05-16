import apiClient from './apiClient';

export const submitOrder = async (cartItems) => {
  return await apiClient.post('/checkout', { items: cartItems });
};

export const saveCartLocally = (cart) => {
  localStorage.setItem('shop_cart', JSON.stringify(cart));
};

export const getCartFromLocal = () => {
  const cart = localStorage.getItem('shop_cart');
  return cart ? JSON.parse(cart) : [];
};
