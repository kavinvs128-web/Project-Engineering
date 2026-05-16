const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ordersData = [
  { id: 'ORD-001', customer: 'John Doe', status: 'Shipped', total: 124.50, date: '2024-03-10' },
  { id: 'ORD-002', customer: 'Jane Smith', status: 'Processing', total: 89.99, date: '2024-03-11' },
  { id: 'ORD-003', customer: 'Bob Johnson', status: 'Delivered', total: 210.00, date: '2024-03-12' },
  { id: 'ORD-004', customer: 'Alice Williams', status: 'Pending', total: 45.25, date: '2024-03-13' },
  { id: 'ORD-005', customer: 'Charlie Brown', status: 'Shipped', total: 156.80, date: '2024-03-14' },
];

const productsData = [
  { id: 1, name: 'Premium Wireless Headphones', price: 199.99, category: 'Electronics', stock: 12 },
  { id: 2, name: 'Eco-Friendly Water Bottle', price: 25.00, category: 'Lifestyle', stock: 45 },
  { id: 3, name: 'Ergonomic Office Chair', price: 349.50, category: 'Furniture', stock: 8 },
  { id: 4, name: 'Smart Fitness Tracker', price: 79.99, category: 'Electronics', stock: 22 },
  { id: 5, name: 'Organic Cotton T-Shirt', price: 29.00, category: 'Apparel', stock: 100 },
  { id: 6, name: 'Minimalist Wall Clock', price: 55.00, category: 'Home Decor', stock: 15 },
];

const customersData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', orders: 12, spent: 1250.40 },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', orders: 8, spent: 890.20 },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', orders: 15, spent: 2100.00 },
  { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', orders: 3, spent: 450.25 },
];

const dashboardStats = {
  totalRevenue: 15420.50,
  totalOrders: 284,
  activeCustomers: 156,
  averageOrderValue: 54.30
};

export const fetchOrders = async () => {
  await delay(1500);
  return ordersData;
};

export const fetchOrdersEmpty = async () => {
  await delay(1500);
  return [];
};

export const fetchOrdersError = async () => {
  await delay(1500);
  throw new Error('Failed to fetch orders from downstream service.');
};

export const fetchProducts = async () => {
  await delay(1200);
  return productsData;
};

export const fetchProductsEmpty = async () => {
  await delay(1200);
  return [];
};

export const fetchProductsError = async () => {
  await delay(1200);
  throw new Error('Unable to connect to inventory database.');
};

export const fetchCustomers = async () => {
  await delay(1000);
  return customersData;
};

export const fetchCustomersEmpty = async () => {
  await delay(1000);
  return [];
};

export const fetchCustomersError = async () => {
  await delay(1000);
  throw new Error('Auth server rejected the customer listing request.');
};

export const fetchDashboardStats = async () => {
  await delay(800);
  return dashboardStats;
};
