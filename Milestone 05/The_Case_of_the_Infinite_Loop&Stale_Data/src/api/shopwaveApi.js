// ─────────────────────────────────────────────────────
//  ShopWave Mock API  —  src/api/shopwaveApi.js
//  Simulates real backend responses with random delays.
//  Do NOT modify this file during the assignment.
// ─────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 1,  name: 'Wireless Headphones Pro',   category: 'Electronics', price: 129.99, stock: 45,  sales: 312  },
  { id: 2,  name: 'Running Shoes X500',         category: 'Footwear',    price: 89.99,  stock: 120, sales: 894  },
  { id: 3,  name: 'Yoga Mat Premium',           category: 'Fitness',     price: 49.99,  stock: 200, sales: 1203 },
  { id: 4,  name: 'Coffee Maker Deluxe',        category: 'Kitchen',     price: 79.99,  stock: 30,  sales: 567  },
  { id: 5,  name: 'Laptop Stand Adjustable',    category: 'Electronics', price: 39.99,  stock: 85,  sales: 2100 },
  { id: 6,  name: 'Water Bottle Insulated',     category: 'Fitness',     price: 24.99,  stock: 300, sales: 3420 },
  { id: 7,  name: 'Desk Lamp LED',              category: 'Electronics', price: 34.99,  stock: 60,  sales: 780  },
  { id: 8,  name: 'Backpack Urban',             category: 'Accessories', price: 59.99,  stock: 75,  sales: 634  },
  { id: 9,  name: 'Resistance Bands Set',       category: 'Fitness',     price: 19.99,  stock: 180, sales: 2890 },
  { id: 10, name: 'Bluetooth Speaker Mini',     category: 'Electronics', price: 44.99,  stock: 55,  sales: 1450 },
  { id: 11, name: 'Sunglasses UV400',           category: 'Accessories', price: 29.99,  stock: 140, sales: 970  },
  { id: 12, name: 'Ceramic Mug Set',            category: 'Kitchen',     price: 22.99,  stock: 95,  sales: 1120 },
];

// Intentionally variable delays to expose race conditions
const ORDERS = [
  { id: 'ORD-1001', customer: 'Alice Johnson',  product: 'Wireless Headphones Pro',  amount: 129.99, status: 'delivered',  date: '2024-11-01' },
  { id: 'ORD-1002', customer: 'Bob Smith',       product: 'Yoga Mat Premium',          amount: 49.99,  status: 'shipped',    date: '2024-11-02' },
  { id: 'ORD-1003', customer: 'Carol White',     product: 'Running Shoes X500',        amount: 89.99,  status: 'processing', date: '2024-11-03' },
  { id: 'ORD-1004', customer: 'David Brown',     product: 'Coffee Maker Deluxe',       amount: 79.99,  status: 'delivered',  date: '2024-11-04' },
  { id: 'ORD-1005', customer: 'Emma Davis',      product: 'Laptop Stand Adjustable',   amount: 39.99,  status: 'shipped',    date: '2024-11-05' },
  { id: 'ORD-1006', customer: 'Frank Miller',    product: 'Water Bottle Insulated',    amount: 24.99,  status: 'delivered',  date: '2024-11-06' },
  { id: 'ORD-1007', customer: 'Grace Lee',       product: 'Bluetooth Speaker Mini',    amount: 44.99,  status: 'cancelled',  date: '2024-11-07' },
];

/**
 * Search products by name or category.
 * Uses a variable delay (200–800 ms) to simulate network latency
 * and expose race conditions when multiple requests are in-flight.
 */
export const searchProducts = (query) => {
  return new Promise((resolve) => {
    const delay = Math.random() * 600 + 200;
    setTimeout(() => {
      const q = query.toLowerCase();
      const results = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
      resolve(results);
    }, delay);
  });
};

/** Fetch orders, optionally filtered by status. */
export const fetchOrders = (filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let orders = [...ORDERS];
      if (filters.status && filters.status !== 'all') {
        orders = orders.filter((o) => o.status === filters.status);
      }
      resolve(orders);
    }, 400);
  });
};

/** Fetch high-level KPI stats for the dashboard. */
export const fetchDashboardStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalRevenue:    48320.50,
        totalOrders:     1284,
        activeCustomers: 892,
        avgOrderValue:   37.60,
      });
    }, 300);
  });
};

/** Update a single order's status. */
export const updateOrderStatus = (orderId, newStatus) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = ORDERS.find((o) => o.id === orderId);
      if (order) {
        order.status = newStatus;
        resolve({ success: true, order });
      } else {
        resolve({ success: false });
      }
    }, 350);
  });
};
