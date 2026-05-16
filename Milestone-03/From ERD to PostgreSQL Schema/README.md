# Challenge 2: From ERD to PostgreSQL Schema

Welcome to the TaskBridge ERD-to-PostgreSQL challenge!

## Overview

This repository contains a partially implemented database schema for the TaskBridge application.

The ER diagram is located in the `ERD/` folder.  
Your task is to translate the ER diagram into a **fully functional PostgreSQL schema**.

Currently, the `schema.sql` file is **broken**:

- Some tables are missing **primary keys**
- **Foreign key relationships** are not enforced
- Some important fields are missing **constraints** (NOT NULL / UNIQUE)

Your job is to **fix the schema**, run it in PostgreSQL, and submit a screenshot showing:

- All tables created correctly
- Correct primary keys
- Correct foreign keys
- Constraints implemented

---

## How to Run

1. Open PostgreSQL and create a database:

```bash
CREATE DATABASE taskbridge;
```
## 2. Run the broken schema:

```
psql -U <your_username> -d taskbridge -f schema.sql
```

## 3. Inspect the tables:
```
\d
\d users
\d projects
\d tasks
```
## Task

- Analyze the ER diagram.

- Correct the schema in schema.sql to match the diagram.

- Execute the corrected schema in PostgreSQL.

- Take a screenshot showing the executed tables.

- Submit the screenshot as proof of completion.