-- Insert 5 real customers
INSERT INTO customers (name, email) VALUES
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Smith', 'bob@example.com'),
  ('Charlie Davis', 'charlie@example.com'),
  ('Diana Ross', 'diana@example.com'),
  ('Edward Norton', 'edward@example.com');

-- Insert products, including some with negative inventory (Bug 2)
INSERT INTO products (name, sku, inventory_count, price) VALUES
  ('Wireless Mouse', 'MO-001', 50, 25.00),
  ('Mechanical Keyboard', 'KB-002', 20, 120.00),
  ('Gaming Headset', 'HS-003', -5, 75.00), -- BUG: Negative inventory
  ('Ultra-Wide Monitor', 'MN-004', -2, 450.00), -- BUG: Negative inventory
  ('Laptop Stand', 'LS-005', 15, 45.00);

-- Insert orders, including orphaned ones (Bug 1)
-- Orders with existing customer_id (1-5)
INSERT INTO orders (customer_id, status, total) VALUES
  (1, 'completed', 145.00),
  (2, 'pending', 120.00),
  (3, 'processing', 25.00);

-- Orders with non-existent customer_id (Bug 1)
INSERT INTO orders (customer_id, status, total) VALUES
  (9999, 'pending', 50.00), -- BUG: Orphaned order
  (9999, 'failed', 450.00); -- BUG: Orphaned order

-- Insert order items to link things up
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 1, 1, 25.00),
  (1, 2, 1, 120.00),
  (2, 2, 1, 120.00),
  (3, 1, 1, 25.00);

-- Insert payments, including duplicate for one order (Bug 3)
INSERT INTO payments (order_id, amount, status) VALUES
  (1, 145.00, 'completed'),
  (2, 60.00, 'pending'), -- First payment entry for order 2
  (2, 60.00, 'completed'); -- Second payment entry for order 2 (BUG: Duplicate order_id)
