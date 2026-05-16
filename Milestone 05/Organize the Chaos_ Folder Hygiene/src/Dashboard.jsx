import React from 'react';
import OrdersList from './OrdersList';
import { Package, User, Clock, ArrowRight, Calculator, Box } from 'lucide-react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white rounded-b-3xl py-20 px-6 shadow-2xl shadow-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center -rotate-12 hover:rotate-0 transition-transform duration-500">
              <User size={48} className="text-slate-100" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold mb-2 tracking-tighter">Welcome back, {user.name || 'Friend'}!</h2>
              <div className="flex items-center gap-4 text-slate-400 font-bold">
                <span className="flex items-center gap-2 italic">
                  <Clock size={16} />
                  Member since 2024
                </span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Premium Account
                </span>
              </div>
            </div>
          </div>
          
          <button className="flex items-center gap-4 px-10 py-5 bg-white text-slate-900 rounded-full font-black text-xl hover:bg-slate-200 transition-all transform active:scale-95 shadow-xl shadow-slate-900/40">
            Edit Profile
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      <div className="-mt-16 relative z-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50 hover:border-slate-200 transition-all group">
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest italic mb-2">Active Orders</p>
            <div className="flex items-center justify-between">
              <h4 className="text-5xl font-black text-slate-900">03</h4>
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center p-3 text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-100 transition-all duration-300">
                 <Package size={32} />
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50 hover:border-slate-200 transition-all group">
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest italic mb-2">Total Spent</p>
            <div className="flex items-center justify-between">
              <h4 className="text-5xl font-black text-slate-900 italic">$2.4k</h4>
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center p-3 text-green-400 group-hover:text-green-700 group-hover:bg-green-100 transition-all duration-300">
                 <Calculator size={32} />
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50 hover:border-slate-200 transition-all group">
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest italic mb-2">Points</p>
            <div className="flex items-center justify-between">
              <h4 className="text-5xl font-black text-slate-900 text-amber-500">1.2k</h4>
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center p-3 text-amber-400 group-hover:text-amber-700 group-hover:bg-amber-100 transition-all duration-300">
                 <Box size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 overflow-hidden mb-20 border border-slate-50">
           <OrdersList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
