// ─────────────────────────────────────────────────────
//  ShopWave — Order Manager Page
//  src/pages/OrderManager.jsx
//
//  ⚠️  THIS FILE CONTAINS 1 INTENTIONAL BUG  ⚠️
//
//  Bug #3 — Direct state mutation
//
//  Your job: find it, fix it, document it in BUG_REPORT.md
// ─────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { fetchOrders, updateOrderStatus } from '../api/shopwaveApi';

const STATUS_COLORS = {
  delivered:  '#3fb950',
  shipped:    '#58a6ff',
  processing: '#d29922',
  cancelled:  '#f85149',
};

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchOrders({ status: filter }).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [filter]);

  const handleStatusChange = async (orderId, newStatus) => {
    setSaving(orderId);
    await updateOrderStatus(orderId, newStatus);

    // ─── BUG ZONE ──────────────────────────────────────
    //
    // Bug #3: Change an order's status via the dropdown.
    //         The API call succeeds, but the coloured badge
    //         on screen NEVER updates.
    //
    // Look at how `setOrders` is being called below.
    // What reference is being passed? Does React see a
    // difference between the old state and new state?
    //
    // ───────────────────────────────────────────────────

    const updatedOrders = orders;                  // ❌ same array reference
    const order = updatedOrders.find(
      (o) => o.id === orderId
    );
    if (order) {
      order.status = newStatus;                    // ❌ mutates existing object
    }
    setOrders(updatedOrders);                      // ❌ React: "same ref → skip re-render"

    setSaving(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>📦 Order Manager</h1>
        <p className="subtitle">
          Track and update every ShopWave customer order.
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="filter-bar">
        {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
          <button
            key={s}
            className={`filter-btn ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="spinner-wrap">
          <div className="spinner" />
          <p>Loading orders…</p>
        </div>
      ) : (
        <div className="order-table-wrap">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>${order.amount.toFixed(2)}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        background: STATUS_COLORS[order.status] + '18',
                        color:      STATUS_COLORS[order.status],
                        border:     `1px solid ${STATUS_COLORS[order.status]}55`,
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      disabled={saving === order.id}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="status-select"
                    >
                      {['processing', 'shipped', 'delivered', 'cancelled'].map(
                        (s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        )
                      )}
                    </select>
                    {saving === order.id && (
                      <span className="saving-label">saving…</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
