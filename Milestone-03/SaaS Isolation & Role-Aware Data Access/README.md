# CorpFlow Workforce Management API (v1.0-beta)

Welcome to the **CorpFlow** engineering starter repository. CorpFlow is a fast-paced SaaS platform designed for high-growth companies to manage their developers, project budgets, and payroll data in one place.

This repository contains the first version of the internal API, which provides a simple, direct interface for managing the workforce across multiple organizational customers like **Pouch.io** and **Velocity**.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)

### 2. Database Setup
Create a new PostgreSQL database named `corpflow`:
```bash
createdb corpflow
```

Run the schema script to Initialize the tables and seed with test data:
```bash
# From the project root
npm run seed
```

### 3. Application Setup
Install dependencies and configure your environment:
```bash
npm install
cp .env.example .env
```
*(Update `.env` with your database credentials.)*

### 4. Run the API
Start the server in development mode:
```bash
npm start
```

## 🛤️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status and greeting |
| GET | `/users` | List all workforce users |
| GET | `/users/:id` | Get details for a specific user |
| GET | `/projects` | List all active project budgets |
| GET | `/projects/:id`| View details on a specific project |

---

## 🛠️ Internal Roadmap (Upcoming Features)
The current version is an early release. The engineering team is moving fast, and we are planning to add:
- Advanced filtering and sorting.
- Complex project-to-user mappings.
- Expanded billing and payroll reporting.
- Enhanced analytics dashboards.

---
**Status:** Alpha
**License:** Private Internal Use Only
