# TrackFlow — Starter Repository

## Challenge: Add the Missing Index (Performance Challenge 6.05)

## What This App Does
TrackFlow is a project management API. Teams manage projects, assign tasks, and comment on work items.

## Setup
1. npm install
2. Copy .env.example to .env (add DATABASE_URL and JWT_SECRET)
3. npx prisma migrate dev
4. npx prisma db seed
5. npm start — server starts at http://localhost:3000

## Seeded Credentials
- admin@trackflow.io / admin123
- user1@trackflow.io / user123 (this user has ~50 assigned tasks)

## Endpoints to Profile
- GET /api/tasks?assignedUserId=1 — tasks assigned to user 1
- GET /api/projects/1/tasks?status=IN_PROGRESS — project tasks by status
- GET /api/tasks/1/comments — comments on task 1

## Your Investigation Task
1. Before touching schema.prisma — run EXPLAIN ANALYZE on each slow query
2. Screenshot the output (these are your baseline evidence)
3. Measure HTTP response times for each endpoint
4. Add the correct @@index decorators to schema.prisma
5. Run: npx prisma migrate dev --name "add_performance_indexes"
6. Re-run EXPLAIN ANALYZE — confirm "Index Scan" replaces "Seq Scan"
7. Re-measure response times and calculate improvement %
8. Update BASELINE.md with all findings

## Files to Investigate
- prisma/schema.prisma (where to add indexes)
- BASELINE.md (where to document findings)
- prisma/migrations/ (where the new migration file will appear)
