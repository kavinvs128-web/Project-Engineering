import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionList from '../components/TransactionList';
import { Search, Wallet, TrendingUp, ArrowUpRight, Plus, Filter } from 'lucide-react';

const Transactions = () => {
  const { filteredTransactions, filter, setFilter } = useTransactions();
  const [selectedId, setSelectedId] = useState(null);

  const selectedTransaction = filteredTransactions.find(t => t.id === selectedId);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Financial Dashboard</h1>
          <p className="text-gray-500 font-medium">Manage and track your latest business transactions</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-brand-200">
          <Plus size={18} strokeWidth={2.5} />
          <span>Add Transaction</span>
        </button>
      </header>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Volume', value: '$12,450.00', icon: Wallet, color: 'text-brand-600', bg: 'bg-brand-50' },
          { label: 'Average Value', value: '$245.90', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Merchant Count', value: '50', icon: ArrowUpRight, color: 'text-indigo-600', bg: 'bg-indigo-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
              <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {/* Filter Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search transactions or categories..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all shadow-sm font-medium"
              />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-500 hover:bg-gray-50">
              <Filter size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-semibold text-gray-500">
              Showing <span className="text-gray-900 font-bold">{filteredTransactions.length}</span> transactions
            </p>
            <div className="flex items-center gap-2 text-sm text-brand-600 font-bold cursor-pointer hover:underline">
              Export CSV
            </div>
          </div>

          {/* List Component */}
          {/* 
            DELIBERATE PERFORMANCE PROBLEM:
            Inline arrow function onSelect={(id) => setSelectedId(id)}
            This creates a new function reference on every single render,
            rendering any potential memoization in child components useless.
          */}
          <TransactionList 
            transactions={filteredTransactions} 
            onSelect={(id) => setSelectedId(id)} 
          />
        </div>

        {/* Details Sidebar */}
        <aside className="w-full lg:w-80 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[400px]">
            {selectedTransaction ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 font-bold text-xl">
                    {selectedTransaction.name[0]}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Status</p>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                      {selectedTransaction.status}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedTransaction.name}</h3>
                <p className="text-sm text-gray-500 font-medium mb-6">{selectedTransaction.category}</p>
                
                <div className="space-y-4 py-6 border-y border-gray-100 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-400">Date</span>
                    <span className="text-sm font-semibold text-gray-900">{new Date(selectedTransaction.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-400">Reference</span>
                    <span className="text-sm font-semibold text-gray-900">#TXN-{selectedTransaction.id.toString().padStart(5, '0')}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Amount</p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    -${selectedTransaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-12">
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                  <Plus className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-400">Select a transaction<br/>to view detailed data</p>
              </div>
            )}
          </div>

          <div className="bg-brand-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
               <h4 className="text-lg font-bold mb-2">Upgrade to Pro</h4>
               <p className="text-brand-200 text-xs mb-4">Get custom reports, unlimited exports, and real-time bank syncing.</p>
               <button className="bg-white text-brand-900 text-xs font-extrabold px-4 py-2 rounded-lg hover:bg-brand-50 transition-colors">
                 Learn More
               </button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-800 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Transactions;
