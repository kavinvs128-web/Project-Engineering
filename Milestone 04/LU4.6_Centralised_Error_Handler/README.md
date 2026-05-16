# LU 3.6 — The Safety Net (Starter Code)

This repository contains the starter code for building a centralized Express error handler. 

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up the SQLite database:** Copy the environment variables and run the migration to create the local database file.
   ```bash
   cp .env.example .env
   npx prisma migrate dev --name init
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

## How to Test Your API

We have provided a `tests.http` file so you can easily test your API directly inside VS Code without needing Postman.

1. Install the free **REST Client** extension in VS Code (by Huachao Mao).
2. Open the `tests.http` file located in the root of your project.
3. Ensure your server is running (`npm run dev`).
4. Click the **Send Request** button that appears above each test case.

> **Before you start coding:** Click through the tests and observe the broken, inconsistent responses.
> **When you are done:** All 5 tests should return the exact same predictable JSON shape: `{ "error": true, "message": "...", "statusCode": N }`.