# Event Manager – Invite-Only Access (Security Challenge)

Welcome to the **Matrix Access Event Manager**. This system handles sensitive event data and requires authorized access. However, recent system logs indicate several authentication and authorization bypasses.

## Setup Instructions

### 1. Backend (Server)
```bash
cd server
npm install
npm run dev
```
Port: 5000

### 2. Frontend (Client)
```bash
cd client
npm install
npm run dev
```
Port: 3000

## Security Challenge

Your mission is to identify and document the following security vulnerabilities in the system.

| # | Vulnerability | Path | Hint / Where to Look? |
|---|---------------|------|-------------------------|
| 1 | Private Node Disclosure | `server/routes/events.js` | `GET /api/events/:id` - Any authenticated user can view any node. Where is the invitation check? |
| 2 | Unauthorized RSVP Access | `server/routes/events.js` | `POST /api/events/:id/rsvp` - Does it verify the user is invited before updating the stack? |
| 3 | Global Node Listing | `server/routes/events.js` | `GET /api/events` - The system returns all nodes. Should it filter by identity? |
| 4 | Data Node Purge Bypass | `server/routes/events.js` | `DELETE /api/events/:id` - Can someone delete a node they don't own? |
| 5 | UI Persistence Glitch | `client/src/pages/EventDetail.jsx` | Are buttons hidden when permissions are missing? Does the backend provide proper flags? |

## Goal
Document your findings in `Changes.md` and implement the fixes to secure the system. Data resets on server restart as it is stored in-memory.
