import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import CartSummary from './CartSummary';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';
import Navbar from './Navbar';
import { useCart } from './useCart';
import { logoutUser } from './loginService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth_token'));
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const cartState = { cart, setCart };

  // Sync cart with localStorage or manage it here
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {isAuthenticated && <Navbar cartCount={cartCount} onLogout={handleLogout} />}
      
      <main className="transition-all duration-500 ease-in-out">
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />} 
          />
          
          <Route 
            path="/" 
            element={isAuthenticated ? <ProductList onAddToCart={addToCart} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/cart" 
            element={isAuthenticated ? <CartSummary cartState={cartState} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/orders" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </main>
      
      {isAuthenticated && (
        <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-50 text-center">
          <p className="text-3xl font-black text-slate-900 mb-6 italic tracking-tighter">ShopFlat</p>
          <p className="text-slate-400 font-bold text-sm tracking-widest uppercase mb-10">© 2024 Built with chaos by the ShopFlat Team</p>
          <div className="flex justify-center gap-10 text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors">
            <button className="hover:underline">Privacy Policy</button>
            <button className="hover:underline">Terms of Service</button>
            <button className="hover:underline">Help Center</button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
