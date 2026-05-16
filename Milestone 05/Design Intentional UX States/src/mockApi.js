// mockApi.js — Simulated Orders API
//
// This module simulates a real async API call.
// You can control which state it returns by changing
// the `SIMULATE` constant below.
//
// CHANGE THIS to test different scenarios:
//   'loading'  — hangs forever (tests your loading state)
//   'success'  — returns order data after a short delay
//   'empty'    — returns an empty array (no orders)
//   'error'    — rejects with an error (tests error state)

export const SIMULATE = 'success'  // ← Change this to test each state

const MOCK_ORDERS = [
  { id: 'ORD-9041', customer: 'Anika Sharma',    product: 'Pro Mechanical Keyboard',  amount: 6999,  status: 'Delivered', date: '2024-12-10', items: 1 },
  { id: 'ORD-9040', customer: 'Rohan Desai',     product: 'Ergonomic Desk Chair',     amount: 18499, status: 'Shipped',   date: '2024-12-10', items: 1 },
  { id: 'ORD-9039', customer: 'Priya Menon',     product: 'Wireless Earbuds + Case',  amount: 5299,  status: 'Processing',date: '2024-12-09', items: 2 },
  { id: 'ORD-9038', customer: 'Kabir Nair',      product: 'USB-C Hub 9-in-1',         amount: 2999,  status: 'Delivered', date: '2024-12-09', items: 1 },
  { id: 'ORD-9037', customer: 'Sneha Iyer',      product: 'Smart Watch Ultra',        amount: 14999, status: 'Pending',   date: '2024-12-08', items: 1 },
  { id: 'ORD-9036', customer: 'Arjun Pillai',    product: '27" 4K IPS Monitor',       amount: 32999, status: 'Shipped',   date: '2024-12-08', items: 1 },
  { id: 'ORD-9035', customer: 'Divya Krishnan',  product: 'Noise-Cancel Headphones',  amount: 8999,  status: 'Delivered', date: '2024-12-07', items: 1 },
  { id: 'ORD-9034', customer: 'Vikram Rao',      product: 'Portable SSD 2TB',         amount: 7499,  status: 'Cancelled', date: '2024-12-07', items: 1 },
]

export function fetchOrders() {
  return new Promise((resolve, reject) => {
    if (SIMULATE === 'loading') {
      // Never resolves — you can test your loading state indefinitely
      return
    }

    setTimeout(() => {
      if (SIMULATE === 'success') {
        resolve(MOCK_ORDERS)
      } else if (SIMULATE === 'empty') {
        resolve([])
      } else if (SIMULATE === 'error') {
        reject(new Error('Failed to fetch orders. Server returned 503.'))
      }
    }, 1800)
  })
}
