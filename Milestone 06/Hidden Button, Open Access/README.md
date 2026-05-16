# ShopAdmin

A product management app for an online store. Admins can create, edit, publish, and delete products. Customers can browse the full catalogue (including unpublished drafts).

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | Node.js · Express · Prisma · SQLite |
| Frontend | React 18 · Vite                     |
| Auth     | JSON Web Tokens (JWT) · bcryptjs    |

---

## Setup

### 1 — Clone & install dependencies

```bash
# Backend
cd backend
npm install

# Frontend (separate terminal)
cd frontend
npm install
```

### 2 — Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/shopadmin"
JWT_SECRET="any-long-random-string"
PORT=3001
```

> **SQLite alternative** — change the datasource provider in `backend/prisma/schema.prisma` to `sqlite` and set `DATABASE_URL="file:./dev.db"` if you don't have PostgreSQL running locally.

### 3 — Create the database and run migrations

```bash
cd backend
npx prisma migrate dev --name init
```

### 4 — Seed the database

```bash
cd backend
npm run seed
```

Expected output:

```
🌱 Seeding database...

Seeded: admin@shopadmin.com (admin), customer@shopadmin.com (customer)
  ✅ published  Noise-Cancelling Headphones — $249.99 (Electronics)
  ✅ published  Ergonomic Office Chair — $399.00 (Furniture)
  ✅ published  Ceramic Pour-Over Coffee Set — $64.95 (Kitchen)
  📦 draft     Mechanical Keyboard — Compact 75% — $139.00 (Electronics)
  📦 draft     Merino Wool Running Socks (3-Pack) — $28.50 (Apparel)

✅ Seed complete.
```

### 5 — Start both servers

```bash
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

Open **http://localhost:5173**

---

## Test Accounts

| Role     | Email                      | Password    |
|----------|----------------------------|-------------|
| Admin    | admin@shopadmin.com        | password123 |
| Customer | customer@shopadmin.com     | password123 |

Log in as each role and observe what the product list looks like — pay close attention to the action buttons on each product card.

---

## Testing the API

You can call the API directly with curl. Start by logging in to get a token:

```bash
# Get a customer token
curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@shopadmin.com","password":"password123"}' \
  | python3 -m json.tool
```

Copy the `token` value from the response. Then retrieve the product list to get a product ID:

```bash
curl -s http://localhost:3001/api/products \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN_HERE" \
  | python3 -m json.tool
```

Copy any `id` from the list. Now try this:

```bash
curl -s -X DELETE http://localhost:3001/api/products/PRODUCT_ID_HERE \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN_HERE"
```

Record the HTTP status code and the full JSON response body in **CHANGES.md** under *Before — Bypass Proof*.

---

## Project Structure

```
backend/
  index.js                  Express app entry
  prisma.js                 Prisma client
  middleware/
    auth.js                 JWT verification middleware
  routes/
    auth.js                 Login & register
    products.js             Product CRUD
  prisma/
    schema.prisma           Database schema
    seed.js                 Test data

frontend/
  src/
    contexts/
      AuthContext.jsx       Auth state (user, token)
    pages/
      Login.jsx
      Products.jsx
    components/
      ProductActions.jsx    Role-aware action buttons
      ProductForm.jsx       Create / edit form
```
