import React from 'react';
import TransactionRow from './TransactionRow';

const TransactionList = ({ transactions, onSelect }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-[700px]">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* 
          DELIBERATE PERFORMANCE PROBLEM:
          Rendering all 2,000+ items at once instead of using virtualization 
        */}
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionRow 
              key={transaction.id} 
              transaction={transaction} 
              onSelect={onSelect} 
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 space-y-3">
             <div className="p-4 bg-gray-50 rounded-full">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <p className="text-lg font-medium">No transactions found</p>
             <p className="text-sm">Try adjusting your search filters</p>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-center text-gray-400 font-medium uppercase tracking-widest">
          End of Transactions
        </p>
      </div>
    </div>
  );
};

export default TransactionList;
