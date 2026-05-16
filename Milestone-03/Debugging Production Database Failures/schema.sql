-- Drop tables in order of dependencies
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- Customer records
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BUG 1: Missing Foreign Key (Orphaned Records)
-- The customer_id column should have a REFERENCES customers(id) constraint, but it's missed here.
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER, -- NO FOREIGN KEY!
    status VARCHAR(20) DEFAULT 'pending',
    total DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BUG 2: Missing CHECK Constraint (Invalid Data)
-- The inventory_count column should have a CHECK(inventory_count >= 0) constraint.
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    inventory_count INTEGER DEFAULT 0, -- NO CHECK CONSTRAINT!
    price DECIMAL(10,2) NOT NULL
);

-- Order Items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);

-- BUG 3: Missing UNIQUE Constraint (Duplicate Key Problem)
-- The order_id column should have a UNIQUE constraint to ensure only one payment record per order.
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL, -- NO UNIQUE CONSTRAINT!
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- Can be 'pending' or 'completed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);
