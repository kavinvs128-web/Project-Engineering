import React from 'react';
import Products from './pages/Products';

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo">🛒 ShopGrid</span>
          <span className="tagline">Product Catalogue</span>
        </div>
      </header>
      <main className="app-main">
        <Products />
      </main>
    </div>
  );
}
