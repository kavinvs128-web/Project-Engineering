import { useState, useEffect } from 'react'
import { fetchOrders, SIMULATE } from './mockApi'
import OrdersDashboard from './components/OrdersDashboard'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Dev toolbar — shows which state is being simulated */}
      <div style={{
        background: 'var(--surface-2)', borderBottom: '1px solid var(--border)',
        padding: '8px 32px', display: 'flex', alignItems: 'center', gap: 12,
        fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--text-secondary)',
      }}>
        <span style={{ color: 'var(--text-muted)' }}>🎛️  SIMULATE =</span>
        <span style={{
          color: SIMULATE === 'success' ? 'var(--green)' : SIMULATE === 'error' ? 'var(--red)' : SIMULATE === 'empty' ? 'var(--accent)' : 'var(--blue)',
          fontWeight: 500,
        }}>
          "{SIMULATE}"
        </span>
        <span style={{ color: 'var(--text-muted)' }}>— change in src/mockApi.js to test all states</span>
      </div>

      <OrdersDashboard />
    </div>
  )
}
