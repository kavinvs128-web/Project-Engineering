# Fixing Inefficient Queries & Data Retrieval Patterns

## 🛒 Nexus Supermarket API — Optimization Sprint Starter

Welcome to the Optimization Sprint! This is your broken starter repository. 

Your job is to make this API production-ready. **No new features. No schema changes. Just pure optimization.**

---

## ☁️ Step 1: Get Your Free Cloud Database

You do not need to install PostgreSQL on your computer for this assignment. We will use a free cloud database instead so you can start coding immediately.

1. Go to [Neon.tech](https://neon.tech/) and sign up for a free account (use your GitHub or Google account).
2. Click **"Create a Project"**.
3. Name it `nexus-api` and select **Postgres 15** (or whatever the latest default is). Click Create.
4. On your project dashboard, find the box labeled **"Connection Details"**.
5. Copy your **Postgres connection string**. It will look something like this:
   `postgresql://neondb_owner:xyz123@ep-cool-butterfly-a5.us-east-2.aws.neon.tech/neondb?sslmode=require`

## ⚙️ Step 2: Set Up Your Local Environment

1. Open your `.env` file and paste your Neon database URL:

   ```env
   DATABASE_URL="postgresql://neondb_owner:xyz123@ep-cool-butterfly-a5.us-east-2.aws.neon.tech/neondb?sslmode=require"
   PORT=3000