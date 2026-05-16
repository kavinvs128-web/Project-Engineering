import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Store, User } from 'lucide-react';
import LogoutButton from './LogoutButton';

const Navbar = ({ cartCount, onLogout }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-6 py-4 shadow-sm shadow-slate-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-black text-slate-900 tracking-tighter hover:scale-105 transition-transform">
          Shop<span className="text-slate-400">Flat</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <div className="hidden md:flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 font-bold">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl transition-all ${isActive('/') ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <div className="flex items-center gap-2 text-sm uppercase tracking-widest">
                <Store size={16} />
                Store
              </div>
            </Link>
            <Link 
              to="/orders" 
              className={`px-4 py-2 rounded-xl transition-all ${isActive('/orders') ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <div className="flex items-center gap-2 text-sm uppercase tracking-widest">
                <LayoutDashboard size={16} />
                Orders
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative p-3 hover:bg-slate-50 rounded-2xl transition-all group">
              <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-slate-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="w-[2px] h-8 bg-slate-100 mx-2 hidden md:block" />

            <div className="flex items-center gap-4 pl-4 border-l md:border-none border-slate-100">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">User Session</p>
                  <p className="text-sm font-black text-slate-900 mb-0.5 truncate max-w-[120px]">{user.name || 'Guest User'}</p>
               </div>
               <LogoutButton onLogout={onLogout} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
