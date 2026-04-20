# Changes.md

## 📌 Objective

The goal of this task was to analyze why a query was slow, test an incorrect composite index, and fix the index order to improve performance.

---

## 🧪 Query Used

```sql
SELECT *
FROM employees
WHERE department = 'Sales'
AND salary > 50000;
```

---

## 🐛 Database Bugs Fixed

### Bug 1: Missing Foreign Key in Orders Table

- **Issue**: The `customer_id` column in the `orders` table lacked a foreign key constraint referencing `customers(id)`, allowing orphaned records.
- **Fix**: Added `REFERENCES customers(id)` to the `customer_id` column.
- **Impact**: Prevents invalid orders and maintains referential integrity.

### Bug 2: Missing Check Constraint in Products Table

- **Issue**: The `inventory_count` column could have negative values, which is invalid for inventory.
- **Fix**: Added `CHECK(inventory_count >= 0)` constraint.
- **Impact**: Ensures data integrity by preventing negative inventory counts.

### Bug 3: Missing Unique Constraint in Payments Table

- **Issue**: Multiple payments could exist for the same order, violating business rules.
- **Fix**: Added `UNIQUE` constraint on `order_id`.
- **Impact**: Ensures one payment per order.

---

## ⚡ Index Performance Analysis

### Incorrect Index

- **Index**: `CREATE INDEX idx_employees_wrong ON employees (salary, department);`
- **Problem**: For the query `WHERE department = 'Sales' AND salary > 50000`, the index starts with `salary`, which is a range condition. The database cannot efficiently use the index for the `department` equality filter first.
- **Performance**: Likely requires a full table scan or partial index scan, slow on large datasets (10,000+ rows).

### Correct Index

- **Index**: `CREATE INDEX idx_employees_correct ON employees (department, salary);`
- **Reason**: Places the equality filter (`department = 'Sales'`) first, then the range filter (`salary > 50000`). This allows the database to quickly narrow down to 'Sales' department and then scan the salary range within that subset.
- **Performance**: Efficient index usage, fast query execution.

---

## 📝 Changes Made

- Fixed schema bugs in `schema.sql`
- Updated seed data in `seed.sql` to comply with constraints
- Added employees table with sample data for testing
- Documented index analysis and fixes
