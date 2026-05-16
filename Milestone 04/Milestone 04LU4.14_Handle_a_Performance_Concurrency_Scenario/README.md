# QuickSeat — Concurrency Challenge (Broken Starter)

**QuickSeat** is a flash sale seat booking API. When a popular event goes live, thousands of users hit the booking endpoint simultaneously.

This repository contains a **deliberately broken implementation**. Your job is to identify the two flaws, apply the two-layer defence strategy, and document your understanding.

---

## The Two Flaws

| Flaw | File | What's missing |
|---|---|---|
| No rate limiter | `src/routes/bookings.js` | Any IP can send unlimited requests per second |
| No unique constraint | `prisma/schema.prisma` | Two concurrent inserts for the same seat can both succeed |

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your PostgreSQL connection string
```

### 3. Run the database migration

```bash
npx prisma migrate dev --name init
```

### 4. Seed sample data

```bash
node prisma/seed.js
```

### 5. Start the server

```bash
npm run dev
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/bookings/book` | Book a seat for a show |
| `GET` | `/api/bookings/show/:showId` | List all bookings for a show |
| `GET` | `/health` | Health check |

### Book a seat — request body

```json
{
  "userId": 1,
  "seatId": 1,
  "showId": 1
}
```

---

## Observing the Race Condition

To see the flaw in action, send two simultaneous requests for the same seat:

**Using curl in two terminal windows at the same time:**

```bash
# Terminal 1
curl -X POST http://localhost:3000/api/bookings/book \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "seatId": 1, "showId": 1}'

# Terminal 2 — run this at the same time as Terminal 1
curl -X POST http://localhost:3000/api/bookings/book \
  -H "Content-Type: application/json" \
  -d '{"userId": 2, "seatId": 1, "showId": 1}'
```

Both will return `201 Created`. Then check the bookings:

```bash
curl http://localhost:3000/api/bookings/show/1
```

You'll see two bookings for the same seat. This is the race condition.

---

## Your Tasks

1. **Add a rate limiter** — create `src/middleware/rateLimiter.js` using `express-rate-limit` and apply it to `POST /book`
2. **Add a unique constraint** — add `@@unique([seatId, showId])` to the `Booking` model in `prisma/schema.prisma` and run `npx prisma migrate dev`
3. **Catch P2002** — update `src/services/bookingService.js` to catch `PrismaClientKnownRequestError` with `err.code === 'P2002'` and return `409 Conflict`
4. **Remove findFirst()** — the check-then-insert pattern provides false security; remove it
5. **Fill in `concurrency-explainer.md`** — explain the root cause and your fixes in your own words
6. **Push to your own repo and create a PR**

---

## Sample Data Reference

After seeding, you have:

| Resource | Details |
|---|---|
| Users | Alice (id: 1), Bob (id: 2) |
| Show | Coldplay Live 2025 (id: 1) |
| Seats | A1–A5 (id: 1–5) |

---

## Submission

- GitHub PR link (from `fix/concurrency-and-rate-limit` branch to `main`)
- Video explanation (3–5 minutes, uploaded to Google Drive with public access)
