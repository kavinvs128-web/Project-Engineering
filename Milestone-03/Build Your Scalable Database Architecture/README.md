# OrderFlow — Order Management API

Welcome to OrderFlow! This is a simple order management API built with Node.js, Express, and PostgreSQL. It handles customers, products, orders, payments, and inventory.

The team has been shipping fast to keep up with growth, and we've noticed some data inconsistencies in our production database. We need your help to investigate and fix these issues.

## Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- PostgreSQL

### 2. Environment Configuration
Copy the `.env.example` file to create a `.env` file:
```bash
cp .env.example .env
```
Update the `DATABASE_URL` with your local PostgreSQL connection string.

### 3. Install Dependencies
```bash
npm install
```

### 4. Initialize Database
Create your database and run the schema and seed files using the provided script:
```bash
# Make sure DATABASE_URL is set in your environment or .env
npm run db:init
```

### 5. Run the Application
```bash
# Run in development mode
npm run dev
```

## Known Issues

We have received reports from our warehouse and customer support teams about the following symptoms:

- **"Some orders appear in the system with no associated customer record"**
- **"Certain products show negative inventory counts after order processing"**
- **"Some completed orders show payment status as pending"**

Your task is to identify why these data inconsistencies are occurring and apply the necessary schema fixes to prevent them from happening in the future.

## API Documentation

| Endpoint | Method | Description |
|---|---|---|
| `/customers` | GET | List all customers |
| `/orders` | GET | List all orders with customer names (if any) |
| `/order_items/order/:id` | GET | List all items for a specific order |
| `/products` | GET | List all products and their current inventory |
| `/payments/order/:id` | GET | Get payment history for an order |

---
*OrderFlow — Building the future of commerce, one order at a time.*
