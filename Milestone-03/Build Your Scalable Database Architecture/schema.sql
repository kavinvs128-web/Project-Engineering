-- Drop existing tables to start fresh
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- Customers table: No issues here.
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table: Bug 2 - Missing CHECK constraint on inventory_count.
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sku VARCHAR(50) NOT NULL UNIQUE,
  inventory_count INTEGER DEFAULT 0, -- NO CHECK to prevent negative values
  price DECIMAL(10,2) NOT NULL
);

-- Orders table: Bug 1 - Missing Foreign Key constraint for customer_id.
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER, -- NO FOREIGN KEY REFERENCING customers(id)
  status VARCHAR(20) DEFAULT 'pending',
  total DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items table: Properly linked to orders and products.
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL
);

-- Payments table: Bug 3 - Missing UNIQUE constraint on order_id.
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL, -- NO UNIQUE constraint to prevent multiple payments for one order
  amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
