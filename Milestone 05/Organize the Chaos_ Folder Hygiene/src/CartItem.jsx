import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from './formatCurrency';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-xl font-bold text-slate-900 mb-1 truncate">{item.name}</h4>
        <p className="text-slate-500 font-medium mb-4">{formatCurrency(item.price)}</p>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onUpdateQuantity(item.id, -1)}
            disabled={item.quantity <= 1}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-slate-50"
          >
            <Minus className="w-5 h-5 text-slate-700" />
          </button>
          
          <span className="w-8 text-center font-bold text-slate-900">{item.quantity}</span>
          
          <button 
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-4 ml-auto">
        <span className="text-xl font-bold text-slate-900 whitespace-nowrap">
          {formatCurrency(item.price * item.quantity)}
        </span>
        
        <button 
          onClick={() => onRemove(item.id)}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
