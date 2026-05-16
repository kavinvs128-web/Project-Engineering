# 🏠 Roommate Expense Wars (Starter Repo)

Welcome to the Roommate Expense Wars backend! This project is designed to help roommates track shared costs and see who owes what.

**⚠️ Warning: This repository is intentionally "broken" in terms of production best practices. Your task as an engineer is to identify and fix these architectural flaws.**

## 🎯 Project Goals

The objective of this challenge is not to build features, but to improve the **reliability**, **debuggability**, and **configurability** of the system.

## 🛠 Setup Instructions

<pre>
1. cd server
2. npm install
3. Setup your PostgreSQL database
4. Edit the DATABASE_URL in prisma/schema.prisma (currently hardcoded!)
5. Run npm run prisma:migrate
6. Run npm run dev to start the server
</pre>

## 🚀 Final List of Issues in the Broken Repo

These are the backend-specific flaws you must identify and resolve within the `broken-repo/server` folder:

### 1. Configuration & Security
*   **Hardcoded Secrets**: The `DATABASE_URL` is hardcoded directly inside both `prisma/schema.prisma` and `prisma/prisma.config.ts`, exposing credentials and preventing environment-based configuration.
*   **Improper Prisma Configuration**: Prisma is not correctly using environment variables via `prisma.config.ts`, breaking portability across environments.
*   **Hardcoded Port**: The Express server runs on a fixed port (3000) instead of using `process.env.PORT`, making it incompatible with production environments.
*   **Missing Environment Files**: No `.env` or `.env.example` file is provided, making it unclear what configuration is required to run the application.

### 2. Logging & Observability
*   **Disabled Logging Middleware**: Morgan is installed but not registered as middleware, resulting in no request/response lifecycle logging.
*   **Scattered Console Logs**: Debugging relies on `console.log(req.body)` inside controllers instead of a structured logging approach.
*   **No Request Traceability**: Logs do not include request context (method, route, status), making it difficult to trace failures.
*   **Poor Error Visibility**: When errors occur, the server logs vague messages without useful debugging information such as stack traces or structured output.

### 3. Error Discipline & Reliability
*   **No Startup Validation**: The server starts without verifying whether required environment variables (`PORT`, `DATABASE_URL`, `JWT_SECRET`) are present, leading to unpredictable runtime failures.
*   **No Fail-Fast Behavior**: The application does not validate configuration before booting, violating production reliability practices.
*   **Poor Error Responses**: Controllers return generic responses like `{ error: "Fail" }` without meaningful context, making debugging difficult for both developers and clients.
*   **No Centralized Error Handling**: Errors are handled inconsistently and are not delegated to a central error handler, leading to scattered and unreliable error behavior.

Good luck! 🍀
