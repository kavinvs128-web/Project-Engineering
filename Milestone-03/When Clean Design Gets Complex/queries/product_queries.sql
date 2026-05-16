-- PRODUCT QUERIES
-- These queries simulate common product requests in an application

-- Some of these queries will break after normalization.
-- Your job is to update them so they work with your improved schema.

-- Query 1
-- Get all products

SELECT * FROM products;



-- Query 2
-- Find products under a specific category
-- NOTE: This will break after normalization

SELECT *
FROM products
WHERE categories LIKE '%Electronics%';



-- Query 3
-- Find supplier details for a product
-- NOTE: supplier data currently lives inside products table

SELECT product_name, supplier_name, supplier_phone
FROM products;



-- Query 4
-- Find products with low stock

SELECT product_name, stock_quantity
FROM products
WHERE stock_quantity < 10;



-- TODO FOR LEARNERS
-- After normalizing the schema:
-- 1. Rewrite these queries using JOINs
-- 2. Ensure the same information can still be retrieved