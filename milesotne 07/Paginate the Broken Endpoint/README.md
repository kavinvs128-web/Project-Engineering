# ShopGrid

ShopGrid is a product catalogue application built with **Node.js / Express** (backend) and **React / Vite** (frontend). It uses **Prisma** as the ORM and **PostgreSQL** as the database.

This repository is the **starter codebase** for the *Paginate the Broken Endpoint* performance challenge.

---

## What's broken

The `GET /api/products` endpoint returns **every row in the database** in a single response — no pagination, no limit. The frontend renders them all in one flat list. Your job is to measure the problem and fix it.

---

## Setup

### 1. Clone and configure environment

```bash
cp .env.example .env
```

Edit `.env` and set `DATABASE_URL` to point at your local PostgreSQL instance:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/shopgrid?schema=public"
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Run the database migration

From the **project root**:

```bash
cd backend
npx prisma migrate dev --name init
```

### 4. Seed the database

> ⚠️ **Do not skip the seed step — the performance problem is only visible at the seeded row count.**

```bash
npx prisma db seed
```

This inserts **10,000 products** in batches of 500. You should see progress logs and a total seed time under 30 seconds.

### 5. Start the servers

Open two terminal tabs:

```bash
# Tab 1 — Backend (port 3001)
cd backend
npm run dev

# Tab 2 — Frontend (port 5173)
cd frontend
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

---

## Project structure

```
backend/
  index.js              Express app setup
  routes/products.js    THE BROKEN ENDPOINT
  package.json

frontend/
  src/
    pages/Products.jsx  Renders all products (no pagination)
    components/
      ProductCard.jsx   Single product card
      Pagination.jsx    DOES NOT EXIST — you build this
    App.jsx
    main.jsx
  vite.config.js        Proxies /api → localhost:3001

prisma/
  schema.prisma         Product model
  seed.js               10,000-row seed script

BASELINE.md             Fill in your measurements here
```

---

## Challenge tasks

1. **Measure the baseline** — record response size, time, and row count in `BASELINE.md`.  
2. **Fix the backend** — add `page` and `limit` query params to `GET /api/products`, implement `skip` / `take` in Prisma, return correct pagination metadata.  
3. **Build the frontend paginator** — create `Pagination.jsx`, wire it into `Products.jsx`, fetch only the current page.  
4. **Handle boundaries** — test and handle `page=0`, `page=-5`, `page=99999`, `page=hello`, and the last valid page.  
5. **Document the improvement** — complete `BASELINE.md` with the after measurements and the boundary test table.
