import React from 'react';
import { Package, ChevronRight, Calendar, Calculator, Box } from 'lucide-react';
import { formatCurrency } from './formatCurrency';

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group">
      <div className="flex items-center gap-8">
        <div className="w-20 h-20 bg-slate-50 text-slate-800 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
          <Package size={36} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Box size={16} className="text-slate-400" />
            <h4 className="text-xl font-extrabold text-slate-900">{order.id}</h4>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-400">
            <span className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full text-slate-500">
              <Calendar size={14} />
              {order.date}
            </span>
            <span className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-full text-slate-500">
              <Calculator size={14} />
              {order.items} Items
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between md:justify-end gap-10 border-t border-slate-50 md:border-none pt-6 md:pt-0">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 italic">Total Amount</p>
          <p className="text-3xl font-black text-slate-900">{formatCurrency(order.total)}</p>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <span className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-tighter ${
            order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
          }`}>
            {order.status}
          </span>
          <button className="text-slate-300 hover:text-slate-900 transition-colors hidden md:block">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
