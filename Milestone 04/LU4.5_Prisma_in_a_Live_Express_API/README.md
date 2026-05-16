# **API Design & Backend Architecture · Prisma in a Live Express API**

This repo is **intentionally broken** in specific ways. Your job is to apply the patterns from this LU to stabilize it.

---

## ☁️ Step 1: Get Your Free Cloud Database

You do not need to install PostgreSQL on your computer for this assignment. We will use a free cloud database instead so you can start coding immediately.

1. Go to [Neon.tech](https://neon.tech/) and sign up for a free account (use your GitHub or Google account).
2. Click **"Create a Project"**.
3. Name it `prisma-live` and select **Postgres 15** (or whatever the latest default is). Click Create.
4. On your project dashboard, find the box labeled **"Connection Details"**.
5. Copy your **Postgres connection string**. It will look something like this:
   `postgresql://neondb_owner:xyz123@ep-cool-butterfly-a5.us-east-2.aws.neon.tech/neondb?sslmode=require`

---

## ⚙️ Step 2: Set Up Your Local Environment

1. Create a `.env` file in the root folder of this project.
2. Paste your Neon database URL into it:

```env
DATABASE_URL="YOUR_NEON_CONNECTION_STRING_HERE"
PORT=3000
```

## 🚀 Step 3: Run the Setup Commands

Open your terminal and run these commands in order:

```bash
# 1. Install dependencies
npm install

# 2. Add the stock field to schema.prisma, THEN run the migration:
npx prisma migrate dev --name add-stock

# 3. Add test data to your database (Run ONLY AFTER the migration is successful)
node prisma/seed.js

# 4. Start the development server
npm run dev
```

## The Bugs

| File | Bug |
|------|-----|
| `schema.prisma` | `stock` field missing from `Product` |  |
| `product.controller.js` | `getProducts` uses raw `pg` pool + SQL string | 1 |
| `product.controller.js` | `new PrismaClient()` inline — leaks connections |
| `order.controller.js` | `new PrismaClient()` inline — leaks connections |
| `product.controller.js` + `order.controller.js` | `product.price` read without null check → crash |
| `order.controller.js` | `purchaseItem` has two unprotected `await`s — no transaction |

> ⚠️ `src/lib/db.js` does not exist yet. Task is to create it.

---

## What needs to be done

- [ ] `getProducts` returns data from `prisma.product.findMany()` — no `pool.query`
- [ ] `stock Int @default(0)` added to `Product` in `schema.prisma`
- [ ] Migration committed: `prisma/migrations/` folder present in PR
- [ ] `src/lib/db.js` created with singleton `PrismaClient` export
- [ ] Both controllers import from `../lib/db` — no `new PrismaClient()` anywhere
- [ ] `getProductById` returns `404` when product is not found — no crash
- [ ] `purchaseItem` wraps Order create + stock decrement in `prisma.$transaction([])`
- [ ] GitHub PR submitted with all fixes listed

---

## Endpoints

| Method | Route | Notes |
|--------|-------|-------|
| GET | `/products` | Must use Prisma, not raw SQL |
| GET | `/products/:id` | Must return 404 for unknown IDs |
| POST | `/orders/purchase` | Body: `{ userId, productId }` — must use transaction |
| GET | `/orders/:userId` | Returns all orders for a user |