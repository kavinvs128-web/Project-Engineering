# LedgerApp - Financial Record Management API

Welcome to the LedgerApp starter repository! This is a core financial API designed for early-stage startups to manage user accounts and transaction history with speed and efficiency.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a PostgreSQL database called `ledgerapp`.

3. Initialize the database schema:
   ```bash
   psql -d ledgerapp -f schema.sql
   ```

4. Configure environment variables:
   - Create a `.env` file based on `.env.example`.
   - Set the `DB_URL` with your database credentials.

5. Start the application:
   ```bash
   npm start
   ```

---

## 🛠 API Endpoints

### 👤 Users
- `GET /users`: List all users.
- `GET /users/:id`: Get user details.
- `POST /users`: Create a new user.
- `DELETE /users/:id`: Delete a user account from the system.

### 💳 Accounts
- `GET /accounts`: List all bank accounts.
- `GET /accounts/user/:userId`: List all accounts specifically for a user.
- `POST /accounts`: Create a new checking/savings account.
- `DELETE /accounts/:id`: Remove an account from the database.

### 💸 Transactions
- `GET /transactions`: List all global transactions.
- `GET /transactions/account/:accountId`: List all transactions for a specific account.
- `POST /transactions`: Post a new credit/debit transaction.
- `DELETE /transactions/:id`: Erase a transaction record permanently.

---

## 🏗 Project Structure

- `app.js`: Express application initialization and middleware setup.
- `db.js`: Database connection pool management via `pg`.
- `schema.sql`: Core database structure defining Users, Accounts, and Transactions.
- `routes/`: Implementation of RESTful endpoints for each entity.

---

## 💡 Tech Stack
- **Node.js + Express**
- **PostgreSQL**
- **pg (node-postgres)** for raw SQL execution
