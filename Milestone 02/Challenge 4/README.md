# Community Tool Library

## 🛠️ Overview
The **Community Tool Library** is a local neighborhood platform where residents can share their tools.

---

## 🚀 Getting Started

### 1. Database Setup (PostgreSQL)
Ensure you have PostgreSQL running. Create a database named `tool_library_broken`.
In `server/.env`, set your connection string:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tool_library_broken?schema=public"
```

### 2. Server Setup (Prisma)
```bash
cd server
npm install
npx prisma db push  # To sync database schema
node index.js
```
*Runs on http://localhost:5000*

### 3. Client Setup
```bash
cd client
npm install
npm run dev
```
*Runs on http://localhost:3000*

---

## � Current Status: "It's Broken"
The development team lost focus. Identify the MVP and fix the 5 major bugs documented in `Changes.md`.

### Hints:
- Check `useEffect` in `App.jsx` (Infinite loop).
- Check `POST /api/tools` in `server/routes/tools.js` (Does it actually call Prisma?).
- Check `PATCH` endpoint path in `ToolCard.jsx`.
- Check state management in `App.jsx` (Immutability).
