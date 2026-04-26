-- Drop tables in correct dependency order
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- Customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employees (for indexing test)
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);

-- Composite index (performance)
CREATE INDEX idx_employees_department_salary 
ON employees (department, salary);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    total DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_orders_customer 
    FOREIGN KEY (customer_id) REFERENCES customers(id),

    CONSTRAINT chk_orders_status 
    CHECK (status IN ('pending','completed','cancelled'))
);

-- Products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    inventory_count INTEGER DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL,

    CONSTRAINT chk_inventory_non_negative 
    CHECK (inventory_count >= 0)
);

-- Order Items
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,

    CONSTRAINT fk_order_items_order 
    FOREIGN KEY (order_id) REFERENCES orders(id),

    CONSTRAINT fk_order_items_product 
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT unique_payment_per_order 
    UNIQUE (order_id),

    CONSTRAINT chk_payment_status 
    CHECK (status IN ('pending','completed','failed')),

    CONSTRAINT fk_payments_order 
    FOREIGN KEY (order_id) REFERENCES orders(id)
);