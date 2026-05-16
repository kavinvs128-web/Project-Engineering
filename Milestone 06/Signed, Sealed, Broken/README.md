# TokenApp — Starter Repository

## Challenge: Signed, Sealed, Broken (Authentication Challenge 5.06)

## What This App Does
TokenApp is a task management API with user authentication and admin controls.

Endpoints:
- POST /api/auth/signup — create an account
- POST /api/auth/login — returns a JWT on success
- GET /api/tasks — list all tasks (should require auth)
- POST /api/tasks — create a task (should require auth)
- GET /api/tasks/:id — get one task (should require auth)
- PUT /api/tasks/:id — update a task (should require auth)
- DELETE /api/tasks/:id — delete a task (should require auth)
- GET /api/admin/users — list all users (should require auth + admin)
- DELETE /api/admin/users/:id — delete a user (should require auth + admin)

## Setup
1. npm install
2. Copy .env.example to .env and fill in your MongoDB URI and a JWT_SECRET
3. npm start — server starts at http://localhost:3000
4. Seeded credentials: admin@tokenapp.io / admin123, user@tokenapp.io / user123

## Your Investigation Task
1. Hit every "protected" route without any token. Note what you get.
2. Send a completely fake token to the same routes. Note what you get.
3. Read the codebase and trace where tokens are generated, checked, and verified.
4. Find every place the token flow is broken.
5. Fix every break. Document everything in Changes.md.

## Files to Investigate First
- middleware/authMiddleware.js
- controllers/authController.js
- routes/taskRoutes.js
- routes/adminRoutes.js
