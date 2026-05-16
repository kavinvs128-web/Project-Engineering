# Broken Index Repository

## Project: Employee Reporting DB

This repository simulates a reporting database with slow queries due to **incorrect composite index ordering**. The goal is for learners to investigate and fix the indexes.

---

## Repository Structure

```
employee-reporting-db/
│
├── README.md
├── db/
│   ├── schema.sql       # Database schema with tables and broken indexes
│   ├── sample_data.sql  # Sample data for testing queries
│   └── queries.sql      # Multi-filter queries to analyze performance
└── Changes.md           # File for learners to document fixes
```

---

## Setup Instructions

1. Clone this repository:

```bash
git clone <your-repo-url>
cd employee-reporting-db
```

2. Create the database in PostgreSQL:

```sql
CREATE DATABASE employee_reporting;
\c employee_reporting
```

3. Run the schema file:

```sql
\i db/schema.sql
```

4. Load sample data:

```sql
\i db/sample_data.sql
```

5. Run the queries to see current performance:

```sql
\i db/queries.sql
```

Use `EXPLAIN ANALYZE` to view execution plans and query timings.

---

## What is Broken?

* A composite index exists but the column order **does not match the query filter pattern**.
* Multi-column queries perform **full table scans**.

### Broken Index Example

```sql
-- Incorrect index order
CREATE INDEX idx_salary_department ON employees(salary, department);
```

### Query to Test

```sql
SELECT *
FROM employees
WHERE department = 'Sales'
AND salary > 50000;
```

The database **does not use the index efficiently**.

---

## Learning Task

1. Run the multi-filter queries and observe performance.
2. Investigate the broken indexes.
3. Redesign the composite index with correct column order.
4. Compare performance before and after the fix.
5. Document your reasoning in `Changes.md`.

---

## Notes

* The schema contains additional tables (departments, projects) for context.
* Learners should **not modify table structures**, only indexes.
* Screenshots of query plans before and after the fix are required for submission.

---

Happy debugging and index optimizing!
