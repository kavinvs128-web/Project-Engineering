-- Insert 5 real customers
INSERT INTO
    customers (id, name, email)
VALUES (
        1,
        'John Doe',
        'john.doe@example.com'
    ),
    (
        2,
        'Jane Smith',
        'jane.smith@example.com'
    ),
    (
        3,
        'Bob Johnson',
        'bob.johnson@example.com'
    ),
    (
        4,
        'Alice Williams',
        'alice.williams@example.com'
    ),
    (
        5,
        'Charlie Brown',
        'charlie.brown@example.com'
    );

-- Insert products (some with negative inventory)
-- BUG 2 Demonstration: Negative inventory count
INSERT INTO
    products (
        id,
        name,
        sku,
        inventory_count,
        price
    )
VALUES (
        1,
        'Mechanical Keyboard',
        'SKU-001',
        50,
        89.99
    ),
    (
        2,
        'Wireless Mouse',
        'SKU-002',
        3,
        25.00
    ), -- FIXED: Positive inventory
    (
        3,
        'USB-C Cable (1m)',
        'SKU-003',
        5,
        12.50
    ), -- FIXED: Positive inventory
    (
        4,
        '27-inch Monitor',
        'SKU-004',
        15,
        299.99
    ),
    (
        5,
        'Laptop Stand',
        'SKU-005',
        10,
        45.00
    );

-- Insert normal orders
INSERT INTO
    orders (
        id,
        customer_id,
        status,
        total
    )
VALUES (1, 1, 'completed', 114.99),
    (2, 2, 'pending', 299.99);

-- Insert order items
INSERT INTO
    order_items (
        order_id,
        product_id,
        quantity,
        unit_price
    )
VALUES (1, 1, 1, 89.99),
    (1, 2, 1, 25.00),
    (2, 4, 1, 299.99);

-- Insert payments
INSERT INTO
    payments (order_id, amount, status)
VALUES (1, 114.99, 'completed'),
    (2, 299.99, 'pending');

-- Insert employees for performance testing
-- Generate 10000 employees with various departments and salaries
INSERT INTO
    employees (name, department, salary)
SELECT
    'Employee ' || generate_series,
    CASE
        WHEN generate_series % 10 = 0 THEN 'Sales'
        WHEN generate_series % 10 = 1 THEN 'Engineering'
        WHEN generate_series % 10 = 2 THEN 'Marketing'
        WHEN generate_series % 10 = 3 THEN 'HR'
        WHEN generate_series % 10 = 4 THEN 'Finance'
        WHEN generate_series % 10 = 5 THEN 'Operations'
        WHEN generate_series % 10 = 6 THEN 'IT'
        WHEN generate_series % 10 = 7 THEN 'Legal'
        WHEN generate_series % 10 = 8 THEN 'Support'
        ELSE 'Admin'
    END,
    30000 + (generate_series % 70000) -- Salaries from 30000 to 100000
FROM generate_series (1, 10000);

-- Continue normal sequences for SERIAL
SELECT setval (
        'customers_id_seq', (
            SELECT MAX(id)
            FROM customers
        )
    );

SELECT setval (
        'products_id_seq', (
            SELECT MAX(id)
            FROM products
        )
    );

SELECT setval ( 'orders_id_seq', ( SELECT MAX(id) FROM orders ) );

SELECT setval (
        'employees_id_seq', (
            SELECT MAX(id)
            FROM employees
        )
    );