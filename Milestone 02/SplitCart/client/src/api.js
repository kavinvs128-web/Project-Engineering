const API_URL = 'http://localhost:3001';

export const fetchCart = async () => {
  const response = await fetch(`${API_URL}/cart`);
  return response.json();
};

export const addItem = async (item) => {
  const response = await fetch(`${API_URL}/cart/item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return response.json();
};

export const deleteItem = async (id) => {
  const response = await fetch(`${API_URL}/cart/item/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const confirmPayment = async (payment) => {
  const response = await fetch(`${API_URL}/cart/pay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment),
  });
  return response.json();
};
