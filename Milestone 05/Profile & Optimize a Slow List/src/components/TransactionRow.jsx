import React from 'react';
import { CreditCard, Calendar, ShoppingBag, Tv, Utensils, Truck, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const CATEGORY_ICONS = {
  Shopping: ShoppingBag,
  Entertainment: Tv,
  Food: Utensils,
  Transport: Truck,
  Utilities: Zap,
};

const CATEGORY_COLORS = {
  Shopping: "bg-blue-100 text-blue-700 border-blue-200",
  Entertainment: "bg-purple-100 text-purple-700 border-purple-200",
  Food: "bg-orange-100 text-orange-700 border-orange-200",
  Transport: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Utilities: "bg-amber-100 text-amber-700 border-amber-200",
};

const STATUS_COLORS = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
};

// DELIBERATE PERFORMANCE PROBLEM:
// This component is NOT wrapped in React.memo()
const TransactionRow = ({ transaction, onSelect }) => {
  const Icon = CATEGORY_ICONS[transaction.category] || CreditCard;
  const dateStr = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div 
      onClick={() => onSelect(transaction.id)}
      className="group flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className={cn("p-2 rounded-xl border", CATEGORY_COLORS[transaction.category])}>
        <Icon size={18} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-900 truncate">
            {transaction.name}
          </h3>
          <span className="font-bold text-gray-900 whitespace-nowrap">
            -${transaction.amount.toFixed(2)}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className={cn(
              "px-2 py-0.5 rounded-full border text-[10px] font-medium uppercase tracking-wider",
              CATEGORY_COLORS[transaction.category]
            )}>
              {transaction.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {dateStr}
            </span>
          </div>
          
          <span className={cn(
            "text-[10px] font-bold uppercase py-0.5 px-2 rounded-md",
            STATUS_COLORS[transaction.status]
          )}>
            {transaction.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;
