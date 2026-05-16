# Study Group Hub - Vulnerable Starter Repository

Welcome to the **Study Group Hub**! This is a starter repository designed for a security challenge. The application is a platform where students can create and join study groups, view group members, and send emails to all members (simulated).

**WARNING**: This repository contains **12 intentional security flaws**. Your task is to find them, exploit them to understand the impact, and then fix them.

## Tech Stack
- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- **Authentication**: JWT, bcryptjs

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### 1. Database Setup
Create a PostgreSQL database named `studyhub`.
By default, the application expects:
- **DB User**: `postgres`
- **DB Password**: `password` (Hardcoded in `prisma/schema.prisma` - **Wait, is that secure?**)
- **DB Host/Port**: `localhost:5432`

### 2. Backend Setup
1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Generate Prisma Client:
    ```bash
    npx prisma generate
    ```
4.  Run migrations to create tables:
    ```bash
    npx prisma migrate dev --name init
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```
    The server should be running on `http://localhost:5000`.

### 3. Frontend Setup
1.  Navigate to the `client` directory (in a new terminal):
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the client:
    ```bash
    npm start
    ```
    The app should be running on `http://localhost:3000`.

## ⚠️ Security Challenge

This repository is intentionally **BROKEN** and contains **16 security vulnerabilities** that you must identify and fix. Your goal is to secure the Study Group Hub until it reaches a production-ready state.

### Identified Vulnerabilities (Your Mission)

| # | Vulnerability Category | Hint / Where to Look? |
|---|----------------------|----------------------|
| 1 | **Hardcoded JWT Secret** | Check `server/config/auth.js`. Why is this dangerous? |
| 2 | **Hardcoded Database URL** | Look at `server/prisma.config.ts` and `lib/prisma.js`. |
| 3 | **Startup Validation** | Run the server without a `.env` file. Does it crash or stay silent? |
| 4 | **Insecure CORS Policy** | Check `server.js`. Is the application allowing *any* origin? |
| 5 | **Debug Exposure** | Hit `GET /api/debug/config`. See anything secret? |
| 6 | **Password Hash Leakage** | Log in and check `GET /api/auth/me`. Does it return the `password_hash`? |
| 7 | **Admin Data Breach** | Hit `POST /api/admin/do-something`. It exports ALL user objects. |
| 8 | **Hardcoded Admin Password** | Look for 'super-secret-admin' in `config/admin.js`. |
| 9 | **Registration Weakness** | Can you sign up with a weak password like '123' or a fake email? |
| 10 | **Insecure Logging** | Check your server console. Are passwords being logged in plain text? |
| 11 | **Poor Error Handling** | What status code is returned for a failed login (500 vs 403)? |
| 12 | **Note Deletion Hijack (BOLA)** | Can you delete a note posted by another user? Try it with Postman. |
| 13 | **The "Shadow" Poster** | Can you post a note to a group you haven't joined? |
| 14 | **Sensitive Group Member Data** | View `GET /api/groups/:id`. Does the member list leak hashes? |
| 15 | **Admin Override Exposure** | The Note Deletion admin override uses a leaked password. Find it! |
| 16 | **Lack of Token Validation** | Are tokens being verified on every restricted request? |

Good luck, students!
