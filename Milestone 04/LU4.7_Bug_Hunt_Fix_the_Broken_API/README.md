# LU 4.7 — The Friday Deploy Disaster

> **API Design & Backend Architecture · LU 4.7**

This repo contains a deliberately broken Express API. A junior developer pushed code right before the weekend, leaving behind a trail of silent failures and hanging requests. 

Your job is to find and fix all 8 bugs. The files contain comments pointing you to the exact locations of the bugs, but you must figure out the root cause and implement the correct fix.

---

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure your environment variables:

   For windows
   ```bash
   copy .env.example .env
   ```

   For mac
   ```bash
   cp .env.example .env
   ```

   *Fill in your local `DATABASE_URL` and set `FRONTEND_ORIGIN` to `http://localhost:5173` (or your preferred frontend port).*
3. Push the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## The 8 Bugs To Fix

| Bug | File | Area |
|-----|------|------|
| 01 | `src/user.controller.js` | Missing `await` |
| 02 | `src/user.controller.js` | Wrong HTTP status code |
| 03 | `src/user.controller.js` | No null check |
| 04 | `src/user.controller.js` | No input validation |
| 05 | `server.js` | CORS not configured |
| 06 | `server.js` | Hardcoded config values |
| 07 | `src/user.controller.js` | Error swallowed in catch |
| 08 | `src/user.controller.js` | P2002 not forwarded |

> **Do not modify**: `src/utils/AppError.js` or `src/middleware/errorHandler.js` — these are already properly configured.

---

## Deliverables

- **GitHub PR** — Branch named `fix/friday-disaster-[your-name]`. Must include a clear title and a description outlining your fixes.

- **Google Drive Video** — A 3-5 minute video walking through demonstrating the fixed API endpoints working correctly in Postman or Thunder Client. Make sure the link permissions are set to "Anyone with the link can edit".