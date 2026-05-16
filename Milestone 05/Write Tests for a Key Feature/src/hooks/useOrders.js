import { useState, useEffect, useCallback } from 'react';
import { fetchOrders } from '../api/orders';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Error fetching orders');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return {
    orders,
    isLoading,
    error,
    refetch: getOrders
  };
};
