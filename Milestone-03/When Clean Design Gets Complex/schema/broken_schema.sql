-- BROKEN DATABASE SCHEMA
-- This schema intentionally violates normalization rules
-- Your job is to fix it

CREATE TABLE products (

    product_id INT PRIMARY KEY,

    product_name VARCHAR(100),

    -- PROBLEM:
    -- categories are stored as a comma separated string
    -- this violates First Normal Form (1NF)
    categories VARCHAR(255),

    -- PROBLEM:
    -- supplier information stored directly in product table
    supplier_name VARCHAR(100),
    supplier_phone VARCHAR(20),
    supplier_email VARCHAR(100),

    -- PROBLEM:
    -- multiple tags in one field
    product_tags VARCHAR(255),

    price DECIMAL(10,2),

    -- PROBLEM:
    -- inventory information mixed inside product
    warehouse_location VARCHAR(100),
    stock_quantity INT

);

-- TODO FOR LEARNERS
-- 1. Separate categories into their own table
-- 2. Create a product_categories relationship table
-- 3. Create a suppliers table
-- 4. Move supplier attributes there
-- 5. Separate inventory into its own table
-- 6. Ensure the design follows Third Normal Form