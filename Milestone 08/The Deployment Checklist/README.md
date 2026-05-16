# LaunchPad 🚀

Welcome to LaunchPad, a mission-critical product management application for mission assets. This repository is part of "The Deployment Checklist" challenge.

## About LaunchPad
- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Frontend:** React, Vite, Vanilla CSS
- **Features:** Auth (JWT), CRUD, Role-based Access (Admin vs Customer)

## Local Setup

1. **Clone the repository**
2. **Setup the Database:**
   - Ensure PostgreSQL is running.
   - Run `npm install` in the root (actually, cd into folders below).
   - Create a `.env` file in the root based on `.env.example`.
3. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npx prisma migrate dev --name init
   npx prisma db seed # MUST DO - creates start accounts
   npm run dev
   ```
4. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment Steps (Render/Railway)

### Render (Recommended)
1. **Frontend:**
   - Create a new Static Site.
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node Version: `18.0.0` or higher
2. **Backend:**
   - Create a new Web Service.
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `npm start`
   - Set environment variables from `.env.example`.

> **Note:** For migrations to run in production, ensure your platform is configured to run `npx prisma migrate deploy` in its build phase.

## Test Accounts (Created by Seed)
- **Admin:** `admin@launchpad.com` / `admin123`
- **Customer:** `customer@customer.com` / `customer123`

---

## 🛠 Deployment Health Checklist
LaunchPad is mission-ready... almost. There are deliberate configuration gaps that you must discover and fix to successfully deploy the application to production.

- **Item 05:** Verify CORS configuration isn't using development defaults in production.
- **Item 06:** Your frontend must know exactly where the API is in production.
- **Item 08:** The mission control health check is failing. *TODO: Implement a GET /health route on the backend.*
- **Item 11:** Production environments are sensitive to Node versions. *Tip: Pin your Node version in `backend/package.json` for consistent deployments.*

---

**Before submitting: complete `DEPLOYMENT_CHECKLIST.md` with evidence for all 12 items.**
All checklist items must reach PASS status (except Item 12 which may be SKIP).

## Submission
1. Push your code to a public GitHub repository.
2. Complete the `DEPLOYMENT_CHECKLIST.md`.
3. Provide your live URL in the checklist.
