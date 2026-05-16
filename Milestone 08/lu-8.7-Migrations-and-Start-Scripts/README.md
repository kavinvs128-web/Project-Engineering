# 📝 DevLog — Fix the Broken Deploy #3

## ⚡ Challenge Scenario

Your team built **DevLog** — a developer journal API where users track their daily coding progress, mood, and learnings. The previous developer got it working locally and deployed it to Render.

The Render dashboard shows the deploy succeeded (green checkmark), and the health check passes. Victory? Not quite.

The first user tries to sign up and gets a **500 error**. You check the Render logs and see:

```
Error: The table 'User' does not exist in the current database.
```

Wait... but it works locally? What's going on?

Your job: **diagnose and fix the migration, script, and database connection issues** so the app runs properly in production.

---

## 🎯 Learning Objectives

By completing this challenge, you will:

- Understand the difference between `prisma migrate dev` (local) and `prisma migrate deploy` (production)
- Read deployment logs to identify **table-not-found** errors caused by missing migrations
- Fix a **mismatched start script** that references the wrong entry file
- Understand the difference between **internal** and **external** database connection strings on Render
- Verify that the production database schema matches the Prisma schema

---

## 🗂️ Project Structure

```
devlog-api/
├── package.json               # Start script has a bug!
├── render.yaml                # Build command + DB URL have bugs!
├── .env.example
├── .gitignore
├── DEPLOYMENT_LOG.md
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20240101000000_init/
│           └── migration.sql  # Migration exists but was never deployed!
├── src/
│   ├── server.js              # The REAL entry file
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── auth.js
│       ├── logs.js
│       └── health.js
```

---

## 🚀 Step-by-Step Instructions

### Step 1: Observe the Failures

1. The Render dashboard shows a green deploy ✅ — looks fine
2. Hit `GET /api/health` — it works! Returns `{"status":"ok"}`
3. Try `POST /api/auth/signup` — **500 error** 💥
4. Check Render logs:
   ```
   Error: The table 'User' does not exist in the current database.
   ```
5. Look more carefully at the deploy logs — did the service actually start with `npm start`?

### Step 2: Diagnose the Three Issues

#### Issue 1: Missing Migrations
- The migration SQL file exists in `prisma/migrations/`
- Locally, the developer ran `prisma migrate dev` which both creates AND applies migrations
- In production, `prisma migrate deploy` must be run explicitly to apply pending migrations
- The build command runs `prisma generate` but skips `prisma migrate deploy`

#### Issue 2: Wrong Start Script
- Look at `package.json` → the `start` script points to `src/app.js`
- But the actual entry file is `src/server.js`
- The `dev` script correctly uses `server.js` — this is why it works locally
- In production, Render runs `npm start`, which triggers the wrong file

#### Issue 3: External Database URL
- In `render.yaml`, the `DATABASE_URL` is a hardcoded **external** connection string
- External URLs go through the public internet (higher latency, connection limits)
- Internal URLs within Render's network are faster and have no connection limits
- Render provides `fromDatabase` to automatically use the internal URL

### Step 3: Apply the Fixes

Create a new branch: `fix/migrations-start`

#### Fix #1 — Add `prisma migrate deploy` to the build command
```yaml
buildCommand: npm install && npx prisma generate && npx prisma migrate deploy
```

#### Fix #2 — Correct the start script
In `package.json`:
```json
"start": "node src/server.js"
```

#### Fix #3 — Use Render's internal database URL
In `render.yaml`, replace the hardcoded external URL:
```yaml
- key: DATABASE_URL
  fromDatabase:
    name: devlog-db
    property: connectionString
```

### Step 4: Redeploy & Test

1. Push your fixes
2. Watch the Render deploy logs — you should see migration output:
   ```
   Running prisma migrate deploy...
   1 migration applied successfully.
   ```
3. Hit `POST /api/auth/signup` — should return `201`
4. Hit `GET /api/health` — should return `{"status":"ok"}`
5. No table-not-found errors in logs

### Step 5: Document

Fill in `DEPLOYMENT_LOG.md` — specifically note which log line revealed each issue.

---

## 📤 Submission

- **GitHub PR** from branch `fix/migrations-start` → `main`
- **Video** (3–5 min) showing:
  - The original "table does not exist" error in Render logs
  - Your migration running successfully in the deploy log
  - The start script fix
  - A successful signup request

---

## 📊 Rubric (10 Marks)

| Points | Criteria |
|--------|----------|
| **3** | Build command includes `npx prisma migrate deploy`. Proven by Render deploy log showing migration ran successfully (screenshot in PR). |
| **3** | Start script fixed and points to correct entry file. Service starts without crash. |
| **2** | `DATABASE_URL` uses internal connection string. No connection limit errors in logs. |
| **2** | `DEPLOYMENT_LOG.md` updated with migration failure diagnosis and fix. |
| **10** | **Total** |

---

## 💡 Hints

<details>
<summary>Hint 1 — prisma migrate dev vs deploy</summary>

| Command | When to Use | What It Does |
|---|---|---|
| `prisma migrate dev` | Local development | Creates new migrations + applies them + resets DB if needed |
| `prisma migrate deploy` | Production/CI | Applies **existing** migration files to the database |

In production, you should **never** run `migrate dev` — it can reset your database!
</details>

<details>
<summary>Hint 2 — Finding the start script issue</summary>

Compare these two lines in `package.json`:
```json
"start": "node src/app.js",    // <-- wrong file!
"dev": "nodemon src/server.js"  // <-- correct file
```

If `npm run dev` works locally but `npm start` fails, the start script is pointing to the wrong file.
</details>

<details>
<summary>Hint 3 — Internal vs External DB URLs on Render</summary>

Render provides **two** connection strings for each database:

| Type | URL Pattern | Use Case |
|---|---|---|
| **Internal** | `postgres://...@dpg-xxx-a/dbname` | Services within Render (production) |
| **External** | `postgres://...@dpg-xxx-a.oregon-postgres.render.com/dbname` | Connecting from outside (local dev, tools) |

In `render.yaml`, use `fromDatabase` to automatically get the internal URL:
```yaml
- key: DATABASE_URL
  fromDatabase:
    name: devlog-db
    property: connectionString
```
</details>

---

## 🔧 Local Development

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```
