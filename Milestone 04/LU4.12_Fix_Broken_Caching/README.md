# Student Side-Hustle Platform 


This platform allows students to post and browse small tasks. Due to performance needs, an in-memory caching layer was added, but the implementation is unreliable.

## Known Issues

1. **Stale Data**: Tasks still appear after deletion. Newly created tasks are often missing.
2. **Inconsistent Responses**: Sometimes detailed task views show data from other tasks!
3. **Memory Leak**: The cache grows without bound; there is no cleanup mechanism (TTL).
4. **Data Corruption**: Occasional crashes and strange behavior when fetching tasks.
5. **Slow Response recovery**: Error messages are confusing or missing entirely.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **ORM**: Prisma (Latest)

## Setup Instructions

### 1. Prerequisites
Ensure you have Node.js and PostgreSQL installed.

### 2. Backend Setup
<pre>
cd backend
npm install
# Setup .env (DATABASE_URL required)
npx prisma migrate dev --name init
npm run dev
</pre>

### 3. Frontend Setup
<pre>
cd frontend
npm install
npm run dev
</pre>

---
**Goal**: Identify and fix the caching and response handling bugs to restore trust in the system.
