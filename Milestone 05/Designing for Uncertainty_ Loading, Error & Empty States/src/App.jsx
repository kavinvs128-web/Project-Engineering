import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, Bell } from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-600 text-white shadow-md font-semibold' 
        : 'text-gray-600 hover:bg-white hover:text-blue-600'
    }`}
  >
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </Link>
);

const App = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r border-gray-200 p-6 flex flex-col gap-8 shadow-sm">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic shadow-sm">
            S
          </div>
          <span className="text-xl font-black text-gray-800 tracking-tighter">ShopDash</span>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarLink 
            to="/" 
            icon={LayoutDashboard} 
            label="Dashboard Overview" 
            active={location.pathname === '/'} 
          />
          <SidebarLink 
            to="/orders" 
            icon={ShoppingCart} 
            label="Manage Orders" 
            active={location.pathname === '/orders'} 
          />
          <SidebarLink 
            to="/products" 
            icon={Package} 
            label="Inventory Hub" 
            active={location.pathname === '/products'} 
          />
          <SidebarLink 
            to="/customers" 
            icon={Users} 
            label="Customer List" 
            active={location.pathname === '/customers'} 
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <SidebarLink to="#" icon={Settings} label="System Settings" active={false} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white/50">
        <header className="h-16 border-b border-gray-200 px-8 flex justify-between items-center bg-white shadow-sm">
          <div className="text-sm font-semibold text-gray-400 font-mono uppercase tracking-[0.2em]">
            Production Environment
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
