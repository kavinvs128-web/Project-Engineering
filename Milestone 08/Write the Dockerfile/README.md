# ShipAPI — Starter Repository

## Challenge: Write the Dockerfile (Deployment Challenge 7.11)

## What This App Does
ShipAPI is a shipment tracking backend.

Endpoints:
- GET /health → {"status":"ok","timestamp":"..."}
- GET /api/shipments → list shipments (requires auth)
- POST /api/shipments → create shipment (requires auth)

## Running Locally (Without Docker)
1. `npm install`
2. Copy `.env.example` to `.env` (add your `DATABASE_URL` and `JWT_SECRET`)
3. `npx prisma migrate dev`
4. `npm start` — server starts at http://localhost:3000

## Your Task
There is no Dockerfile. Write one from scratch.

Requirements:
1. Create `Dockerfile` in the project root
2. Use `node:20-alpine` as base image
3. Follow layer caching pattern: `COPY package*.json` first, `RUN npm ci`, then `COPY . .`
4. Add `RUN npx prisma generate` before `CMD`
5. Create `.dockerignore` excluding `node_modules`, `.env`, `.git` at minimum
6. Build: `docker build -t shipapi-backend .`
7. Run: `docker run --env-file .env -p 3000:3000 -d shipapi-backend`
8. Verify: `curl http://localhost:3000/health` returns 200
9. Run `docker build` again after a small source change — confirm npm ci layer is CACHED
10. Document everything in `DOCKER_LOG.md`

## Files to Create
- `Dockerfile` (in project root)
- `.dockerignore` (in project root)
- `DOCKER_LOG.md` (complete the template)
