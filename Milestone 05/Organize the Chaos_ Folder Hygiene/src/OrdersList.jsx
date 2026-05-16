import React, { useState, useEffect } from 'react';
import { getOrders } from './ordersService';
import OrderCard from './OrderCard';
import EmptyState from './EmptyState';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { PackageSearch, History, RefreshCcw } from 'lucide-react';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError('Could not load order history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner className="w-12 h-12 text-slate-900 border-t-slate-300" />
        <p className="text-slate-500 font-bold italic animate-pulse">Retriving your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <ErrorMessage message={error} onRetry={fetchOrders} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-10">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-50 flex items-center justify-center p-2">
            <History className="w-8 h-8 text-slate-900" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-1 tracking-tight">Order History</h2>
            <p className="text-slate-500 font-medium italic">Track your past purchases and deliveries.</p>
          </div>
        </div>
        
        <button 
          onClick={fetchOrders}
          className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all hover:shadow-xl hover:shadow-slate-100"
        >
          <RefreshCcw className="w-5 h-5" />
          Refresh View
        </button>
      </div>

      <div className="space-y-6">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
        {orders.length === 0 && (
          <EmptyState 
            title="No orders yet" 
            message="Your purchase history is empty. Time to start your first shopping experience with ShopFlat."
            icon={PackageSearch}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersList;
