import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Transactions from './pages/Transactions';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-white border-b border-gray-100 py-4 px-8 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">TxnTracker</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-bold text-brand-600">Dashboard</a>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Accounts</a>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Cards</a>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Team</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">
              JS
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/" element={<Navigate to="/transactions" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
