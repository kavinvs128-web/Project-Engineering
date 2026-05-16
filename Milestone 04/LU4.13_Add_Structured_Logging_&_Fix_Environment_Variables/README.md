# 🏠 Roommate Expense Wars (Full Stack Starter)

Welcome to the Roommate Expense Wars full-stack project. This repo is divided into a frontend and a backend, both of which are intentionally suboptimal.

## 📂 Project Structure

*   **/server**: Express + Prisma backend (Hardcoded secrets, messy logging, no validation).
*   **/client**: React (Vite) frontend (Hardcoded URLs, no error handling, basic styles).

## 🎯 Your Mission

Your task is to transform this into a production-ready application. You must:
1.  **Backend**: Fix logging, env variables, and startup validation.
2.  **Frontend**: Implement environment variables, proper state management, and a professional UI.

## 🛠 Setup Instructions

### 1. Backend Setup
<pre>
cd server
npm install
edit prisma/schema.prisma (DATABASE_URL)
npm run prisma:migrate
npm run dev
</pre>

### 2. Frontend Setup
<pre>
cd client
npm install
npm run dev
</pre>

## 🚨 Known Issues

*   **Communication**: The frontend uses a hardcoded `http://localhost:3000`. If you change the server port, everything breaks.
*   **UX**: There are no loading indicators. If the server is slow, the user sees nothing.
*   **Aesthetics**: The design is "intern-level" - basic, unaligned, and uninspiring.
*   **Secrets**: Database URLs and Ports are scattered throughout the code instead of in `.env` files.

Good luck!
