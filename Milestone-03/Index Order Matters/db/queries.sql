-- Multi-filter query that should use the composite index
SELECT *
FROM employees
WHERE department = 'Sales'
AND salary > 50000;

-- Another query example
SELECT *
FROM employees
WHERE department = 'Engineering'
AND salary >= 70000;