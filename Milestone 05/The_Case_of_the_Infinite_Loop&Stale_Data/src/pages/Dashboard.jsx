// ─────────────────────────────────────────────────────
//  ShopWave — Dashboard Page
//  src/pages/Dashboard.jsx
//
//  ✅  No bugs here. This page is working correctly.
//  Use it to understand the app before debugging the
//  other two pages.
// ─────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { fetchDashboardStats } from '../api/shopwaveApi';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []); // runs once on mount — correct ✅

  if (loading) {
    return (
      <div className="page">
        <div className="spinner-wrap">
          <div className="spinner" />
          <p>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>📊 Dashboard</h1>
        <p className="subtitle">
          ShopWave real-time business overview — November 2024
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-value">{stats.totalOrders.toLocaleString()}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats.activeCustomers.toLocaleString()}</div>
          <div className="stat-label">Active Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">${stats.avgOrderValue}</div>
          <div className="stat-label">Avg Order Value</div>
        </div>
      </div>

      <div className="info-banner">
        <strong>🐛 Assignment:</strong> Two pages in this app contain bugs.
        Navigate to <strong>Product Search</strong> and{' '}
        <strong>Order Manager</strong> using the sidebar to find and fix them.
        Open <strong>DevTools → Console</strong> and <strong>Network</strong> tabs
        before you start!
      </div>
    </div>
  );
}
