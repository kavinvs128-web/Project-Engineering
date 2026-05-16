-- Insert 5 real customers
INSERT INTO customers (id, name, email) VALUES
(1, 'John Doe', 'john.doe@example.com'),
(2, 'Jane Smith', 'jane.smith@example.com'),
(3, 'Bob Johnson', 'bob.johnson@example.com'),
(4, 'Alice Williams', 'alice.williams@example.com'),
(5, 'Charlie Brown', 'charlie.brown@example.com');

-- Insert products (some with negative inventory)
-- BUG 2 Demonstration: Negative inventory count
INSERT INTO products (id, name, sku, inventory_count, price) VALUES
(1, 'Mechanical Keyboard', 'SKU-001', 50, 89.99),
(2, 'Wireless Mouse', 'SKU-002', -3, 25.00), -- Negative inventory
(3, 'USB-C Cable (1m)', 'SKU-003', -5, 12.50), -- Negative inventory
(4, '27-inch Monitor', 'SKU-004', 15, 299.99),
(5, 'Laptop Stand', 'SKU-005', 10, 45.00);

-- Insert normal orders
INSERT INTO orders (id, customer_id, status, total) VALUES
(1, 1, 'completed', 114.99),
(2, 2, 'pending', 299.99);

-- BUG 1 Demonstration: Orphaned Records (customer_id 9999 doesn't exist)
INSERT INTO orders (id, customer_id, status, total) VALUES
(3, 9999, 'completed', 50.00),
(4, 9999, 'pending', 75.00);

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 89.99),
(1, 2, 1, 25.00),
(2, 4, 1, 299.99);

-- Insert payments
-- BUG 3 Demonstration: Duplicate payments for the same order (one 'pending', one 'completed')
INSERT INTO payments (order_id, amount, status) VALUES
(1, 114.99, 'pending'),
(1, 114.99, 'completed'); -- Duplicate for order_id 1

-- Continue normal sequences for SERIAL
SELECT setval('customers_id_seq', (SELECT MAX(id) FROM customers));
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders));
