# FocusForge Database Integrity Challenge

Welcome to the **FocusForge Database Integrity Challenge**! This repository contains a deliberately broken database schema for a productivity application. Your mission is to analyze the current design, identify integrity issues, and implement **database-level constraints** to ensure that only valid, consistent data can ever enter the system.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Current Schema Issues](#current-schema-issues)
- [Goals](#goals)
- [Database Entities](#database-entities)
- [Getting Started](#getting-started)
- [Steps to Complete](#steps-to-complete)
- [Example: Observing the Problem](#example-observing-the-problem)
- [Submission Guidelines](#submission-guidelines)
- [Observations](#observations)

---

## Overview

FocusForge is a simple productivity tool that manages **Users**, **Projects**, and **Tasks**. The initial database schema was created without proper constraints, allowing invalid data to be inserted. This challenge is designed to teach you how to enforce data integrity using SQL constraints such as:

- `NOT NULL`
- `UNIQUE`
- `CHECK`
- `FOREIGN KEY`

By the end of this exercise, you will have modified the schema so that it rejects any data that does not meet the business rules.

---

## Problem Statement

The current database permits:

- Tasks without titles (empty or `NULL` titles)
- Duplicate email addresses for different users
- Invalid priority values (e.g., strings outside a defined set, or arbitrary numbers)
- Tasks that reference projects which do not exist (orphan tasks)

These problems can lead to application errors, incorrect reporting, and overall poor data quality. Your goal is to **prevent these issues at the database level** by adding the appropriate constraints.

---

## Current Schema Issues

| Issue                     | Description                                                                 | Consequence                                      |
|---------------------------|-----------------------------------------------------------------------------|--------------------------------------------------|
| Missing task titles       | The `title` column in the `tasks` table allows `NULL` or empty strings.    | Tasks become unidentifiable.                     |
| Duplicate user emails     | The `email` column in the `users` table has no uniqueness constraint.      | Multiple accounts with same email cause confusion.|
| Invalid priority values   | The `priority` column accepts any string or number, not just valid ones.   | Sorting/filtering tasks by priority breaks.      |
| Orphan tasks              | The `project_id` in `tasks` can reference a non‑existent project.          | Data inconsistency and broken foreign relationships.|

---

## Goals

1. **Add `NOT NULL` constraints** where columns must always have a value (e.g., task titles, user names, project names).
2. **Add `UNIQUE` constraints** to prevent duplicate emails and other logically unique fields.
3. **Add `CHECK` constraints** to restrict priority values to an allowed set (e.g., `'Low'`, `'Medium'`, `'High'`).
4. **Add `FOREIGN KEY` constraints** to ensure that every task belongs to an existing project.
5. (Optional) Consider other constraints like default values or data type refinements.

---

## Database Entities

The database consists of three tables:

### `users`
- `id` (INT, primary key)
- `name` (VARCHAR)
- `email` (VARCHAR)

### `projects`
- `id` (INT, primary key)
- `name` (VARCHAR)
- `owner_id` (INT, foreign key to `users.id`)

### `tasks`
- `id` (INT, primary key)
- `title` (VARCHAR)
- `priority` (VARCHAR)
- `project_id` (INT, foreign key to `projects.id`)

---

## Getting Started

1. **Clone or download** this repository.
2. Ensure you have a SQL database environment (e.g., PostgreSQL, MySQL, SQLite).  
   *Note: The exact SQL syntax may vary slightly depending on your DBMS; adjust as needed.*
3. Run the provided scripts in the following order:

   ```sql
   -- 1. Create the initial (broken) schema
   \i schema.sql

   -- 2. Insert valid sample data
   \i sample_data.sql

   -- 3. Attempt to insert invalid data
   \i invalid_data.sql
   ```

4. Observe that the invalid data is accepted – that’s the problem you need to fix.

---

## Steps to Complete

1. **Analyze** the `schema.sql` file and identify which constraints are missing.
2. **Modify** `schema.sql` (or create a new migration script) to include the necessary constraints.  
   *You may add `ALTER TABLE` statements or rewrite the `CREATE TABLE` commands.*
3. **Test** your changes by dropping the existing tables and re‑running the scripts.  
   The `invalid_data.sql` script should now fail with constraint violation errors.
4. **Document** your findings and fixes in `Observations.md`.

---

## Example: Observing the Problem

Run the `invalid_data.sql` script against the original schema.  
You will see that all inserts succeed, even though they contain:

```sql
-- A task with no title
INSERT INTO tasks (priority, project_id) VALUES ('High', 1);

-- Duplicate email for a second user
INSERT INTO users (name, email) VALUES ('Jane Doe', 'john@example.com');

-- Task with an invalid priority
INSERT INTO tasks (title, priority, project_id) VALUES ('Invalid priority task', 'Urgent', 1);

-- Task referencing a non‑existent project
INSERT INTO tasks (title, priority, project_id) VALUES ('Orphan task', 'Low', 999);
```

After you add constraints, each of these inserts should produce an error and be rejected.

---

## Submission Guidelines

When you have successfully implemented the constraints, submit the following:

1. **Screenshots** showing:
   - The invalid data being inserted **before** constraints (optional, but helpful for comparison)
   - The `CREATE TABLE` or `ALTER TABLE` statements you added (i.e., the constraints themselves)
   - The database rejecting the invalid data **after** constraints are applied

2. **Updated `Observations.md`** file containing:
   - A description of the problems you discovered in the original schema
   - A list of the constraints you added and why each one is necessary
   - Any challenges you faced and how you overcame them
   - (Optional) Suggestions for further improvements

---

## Observations

Use the `Observations.md` file to record your thought process, the issues you identified, and the solutions you implemented. This is an important part of the submission, as it demonstrates your understanding of database integrity.

---

Good luck, and remember: **constraints are your friends!** They protect your data from accidental (or intentional) corruption and make your application more robust.

If you have any questions, feel free to open an issue in this repository.
