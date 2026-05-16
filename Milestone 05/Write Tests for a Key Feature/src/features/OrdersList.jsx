import React from 'react';
import { useOrders } from '../hooks/useOrders';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Package, Calendar, CheckCircle2, Clock, Truck } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'In Transit': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Processing': return 'bg-primary-500/10 text-primary-400 border-primary-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="w-3 h-3" />;
      case 'In Transit': return <Truck className="w-3 h-3" />;
      case 'Processing': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getColors()}`}>
      {getIcon()}
      {status}
    </span>
  );
};

const OrdersList = () => {
  const { orders, isLoading, error, refetch } = useOrders();

  if (isLoading) {
    return (
      <div className="space-y-4 w-full max-w-2xl">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-slate-700 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-slate-700 rounded w-1/3" />
              <div className="h-3 bg-slate-700 rounded w-1/4" />
            </div>
            <div className="w-20 h-6 bg-slate-700 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-8">
        <ErrorMessage 
          message="Something went wrong loading your orders." 
          onRetry={refetch} 
        />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <EmptyState 
          title="No orders yet" 
          message="Your first order will appear here." 
        />
      </div>
    );
  }

  return (
    <ul className="space-y-4 w-full max-w-2xl">
      {orders.map((order) => (
        <li 
          key={order.id} 
          className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/10 transition-all duration-300 group cursor-default"
        >
          <div className="p-3 bg-primary-900/40 rounded-xl transition-colors group-hover:bg-primary-800/60">
            <Package className="w-6 h-6 text-primary-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">
              {order.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
              <Calendar className="w-3 h-3" />
              <span>{order.date}</span>
            </div>
          </div>

          <StatusBadge status={order.status} />
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;
