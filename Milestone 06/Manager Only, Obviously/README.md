# ExpenseApp — Starter Repository

## Challenge: Manager Only, Obviously (Authentication Challenge 5.09)

## What This App Does
ExpenseApp is an expense management API. Employees submit expenses.
Managers approve or reject them. Admins manage the system.

## Seeded Credentials
- `admin@expenseapp.io` / `admin123` → role: `admin`
- `manager@expenseapp.io` / `manager123` → role: `manager`
- `user@expenseapp.io` / `user123` → role: `user`

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` (add `MONGO_URI` and `JWT_SECRET`)
3. `npm start` — server starts at `http://localhost:3000`
   (Seeded users and expenses are created automatically on first start)

## Endpoints
- **POST** `/api/auth/login` → returns JWT
- **POST** `/api/auth/signup` → creates new user (role: `user`)
- **GET** `/api/expenses` → all expenses (should require manager+)
- **GET** `/api/expenses/mine` → own expenses
- **POST** `/api/expenses` → submit expense
- **PUT** `/api/expenses/:id` → update expense
- **PUT** `/api/expenses/:id/approve` → approve (should require manager+)
- **PUT** `/api/expenses/:id/reject` → reject (should require manager+)
- **DELETE** `/api/expenses/:id` → delete (should require admin)
- **GET** `/api/users` → all users (should require admin)
- **PUT** `/api/users/:id/role` → change role (should require admin)
- **GET** `/api/users/me` → own profile

## Your Task
1. Log in as `user@expenseapp.io` (role: `user`)
2. Try every endpoint — especially approve, delete, and role change
3. Write down every action that succeeds that should not
4. Find where role restrictions are missing in the code
5. Build the middleware and restrictions to match the access model

**Output Requirement**: Complete file contents for every file. App must start, seed users, and run without errors. All endpoints must function. The RBAC gaps are the absence of middleware — not broken code.
