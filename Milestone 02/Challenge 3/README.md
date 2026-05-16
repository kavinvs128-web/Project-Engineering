# TaskNest

TaskNest is a lightweight task management application designed to help users organize their daily tasks.

Users can create tasks, mark them as completed, and track their progress through a dashboard.

The application also includes a Productivity Score, which attempts to represent how productive the user has been while using the system.

## Tech Stack

### Frontend
React (Vite)

### Backend
Node.js + Express

### Database
PostgreSQL

### ORM
Prisma

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tasknest
```

### 2. Backend Setup
Navigate to the server directory.
```bash
cd server
npm install
```

Configure the database connection in `prisma.config.ts`.

Run database migrations.
```bash
npx prisma migrate dev
```

Start the backend server.
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the client directory.
```bash
cd client
npm install
npm run dev
```

The frontend will run locally and connect to the backend server.

## The Situation

The product team recently reviewed the Productivity Score feature.

The feature was originally implemented based on the following client request:

“Add a productivity system so users can see how productive they are.
It should consider important tasks and help users stay consistent.”

However, after reviewing the system, engineers noticed several problems.

The behavior of the productivity score is difficult to interpret.

It is not clear what actions influence the score or how the score should represent productivity.

Additionally, the requirement mentions important tasks, but the system currently does not support any way to mark tasks as important.

## Your Mission

You must investigate the existing implementation of the productivity system and determine whether it behaves meaningfully.

While exploring the system, pay attention to:

• how the productivity score is calculated
• what actions affect the score
• whether the implementation matches the original requirement

If you discover inconsistencies or missing functionality, improve the system so the behavior becomes clearer and more meaningful.
