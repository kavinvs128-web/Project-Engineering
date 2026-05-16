import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProductSearch from './pages/ProductSearch';
import OrderManager from './pages/OrderManager';
import './App.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* ── Sidebar ── */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <div className="logo">
              <span className="logo-icon">🌊</span>
              {sidebarOpen && <span className="logo-text">ShopWave</span>}
            </div>
            <button
              className="toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          <nav className="sidebar-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">📊</span>
              {sidebarOpen && <span className="nav-label">Dashboard</span>}
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">🔍</span>
              {sidebarOpen && <span className="nav-label">Product Search</span>}
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">📦</span>
              {sidebarOpen && <span className="nav-label">Order Manager</span>}
            </NavLink>
          </nav>

          {sidebarOpen && (
            <div className="sidebar-footer">
              <div className="user-badge">
                <span className="user-avatar">AJ</span>
                <div className="user-info">
                  <div className="user-name">Alex Johnson</div>
                  <div className="user-role">Platform Team · Junior Dev</div>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* ── Main ── */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductSearch />} />
            <Route path="/orders" element={<OrderManager />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
