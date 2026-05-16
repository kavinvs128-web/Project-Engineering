# SupportAPI — Kill the N+1 Starter

A lightweight REST API for managing posts and orders. This codebase is intentionally unoptimised for a performance engineering challenge.

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 4. Seed the database

```bash
node prisma/seed.js
```

### 5. Start the development server

```bash
npm run dev
```

The server will start on [http://localhost:3000](http://localhost:3000).

---

## Endpoints

### `GET /health`

Returns the current health status of the API.

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### `GET /posts`

Returns all posts, each with the author's details nested on the post object.

```bash
curl http://localhost:3000/posts
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Getting Started with Microservices",
    "body": "Microservices allow teams to deploy independently...",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "author": {
      "id": 1,
      "name": "Alice Hartman",
      "email": "alice.hartman@example.com"
    }
  }
]
```

---

### `GET /orders`

Returns all orders, each with the order's items array nested on the order object.

```bash
curl http://localhost:3000/orders
```

**Response:**
```json
[
  {
    "id": 1,
    "reference": "ORD-001",
    "status": "delivered",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "items": [
      {
        "id": 1,
        "productName": "Wireless Mechanical Keyboard",
        "quantity": 1,
        "price": 129.99
      }
    ]
  }
]
```

---

## Project Structure

```
├── src/
│   ├── routes/
│   │   ├── posts.js
│   │   └── orders.js
│   ├── services/
│   │   ├── postService.js
│   │   └── orderService.js
│   └── index.js
├── lib/
│   └── prisma.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── .env.example
└── package.json
```
