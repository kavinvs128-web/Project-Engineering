# 🔒 NoteVault API — Fix the Broken Deploy #1

## ⚡ Challenge Scenario

You just joined a startup that built **NoteVault** — a simple notes API where users can sign up, log in, and manage personal notes. The previous developer got it working on their laptop and then... quit.

Your team lead says:

> *"The app works locally but it won't start on Render. The logs show errors we can't figure out. You have 45 minutes to fix it, redeploy, and document what went wrong."*

Your job: **diagnose and fix every environment/config issue** so the app deploys successfully to Render.

---

## 🎯 Learning Objectives

By completing this challenge, you will:

- Read and interpret **production deployment logs** to identify root causes
- Find and fix **hardcoded configuration values** that break in production
- Create a **`.env.example`** file so future developers know what config is needed
- Implement **startup validation** (`validateEnv()`) to fail fast with clear errors
- Successfully **deploy to Render** with all required environment variables

---

## 🗂️ Project Structure

```
notevault-api/
├── package.json
├── render.yaml            # Render Blueprint (has issues!)
├── DEPLOYMENT_LOG.md      # Fill this in as you debug
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── index.js           # Server entry point
│   ├── config/
│   │   └── db.js          # Database connection
│   ├── middleware/
│   │   └── auth.js        # JWT authentication
│   └── routes/
│       ├── auth.js        # Signup / Login
│       ├── notes.js       # CRUD notes
│       └── health.js      # Health check
└── frontend/
    └── src/
        └── config.js      # Frontend API config
```

---

## 🚀 Step-by-Step Instructions

### Step 1: Deploy the Broken App

1. Fork this repo and connect it to [Render](https://render.com)
2. Create a new **Web Service** — point it to your forked repo
3. Set the **Build Command**: `npm install && npx prisma generate`
4. Set the **Start Command**: `npm start`
5. Deploy and **watch it fail** 💥
6. Read the Render logs carefully — take note of every error

### Step 2: Trace the Config Issues

Go through the codebase and identify **every hardcoded or missing** configuration value:

- [ ] Check `src/config/db.js` — is the database URL coming from the environment?
- [ ] Check `src/middleware/auth.js` — is the JWT secret secure and configurable?
- [ ] Check `frontend/src/config.js` — will the API URL work in production?
- [ ] Check `src/index.js` — what happens if required env vars are missing?
- [ ] Check the root directory — is there a `.env.example` for other developers?
- [ ] Check `render.yaml` — are all required env vars listed?

### Step 3: Apply the Fixes

Create a new branch: `fix/env-variables`

1. **Fix #1** — Move all hardcoded values to `process.env` references
2. **Fix #2** — Create `.env.example` listing all required keys with placeholder values
3. **Fix #3** — Add a `validateEnv()` function at server startup that:
   - Checks for `DATABASE_URL` and `JWT_SECRET`
   - Logs a **clear error message** naming the missing variable
   - Exits the process (`process.exit(1)`) if any required var is undefined
4. **Fix #4** — Update `render.yaml` with all required environment variables
5. **Fix #5** — Update the frontend config to use `import.meta.env.VITE_API_URL`

### Step 4: Configure Render

In the Render dashboard, add all required environment variables:

| Variable | Where to Get It |
|---|---|
| `DATABASE_URL` | From your Render PostgreSQL instance |
| `JWT_SECRET` | Generate a strong random string (e.g., `openssl rand -hex 32`) |
| `NODE_ENV` | `production` |

### Step 5: Redeploy & Verify

1. Push your fixes to the `fix/env-variables` branch
2. Trigger a redeploy on Render
3. Confirm: the service starts without errors
4. Hit `GET /api/health` and verify it returns `{ "status": "ok" }`

### Step 6: Document

Fill in **`DEPLOYMENT_LOG.md`** with:
- What failed (paste relevant Render logs)
- Root cause for each issue
- What you fixed (reference files and line numbers)
- Proof it now works (health check response, Render dashboard screenshot)

---

## 📤 Submission

- **GitHub PR** from branch `fix/env-variables` → `main`
- **Video** (3–5 min) walking through:
  - The original errors in Render logs
  - Your `validateEnv()` function blocking startup when vars are missing
  - The successful redeployment

---

## 📊 Rubric (10 Marks)

| Points | Criteria |
|--------|----------|
| **3** | `.env.example` committed with all required keys. No hardcoded values remain in code (grep check). |
| **3** | `validateEnv()` correctly blocks startup when required vars are missing. Proven by log output in video. |
| **2** | Render deployment succeeds and health check passes. Screenshot of green Render dashboard in PR. |
| **2** | `DEPLOYMENT_LOG.md` documents the failure, root cause, fix applied, and redeploy proof. |
| **10** | **Total** |

---

## 💡 Hints

<details>
<summary>Hint 1 — Where to look first</summary>

Run this in the project root:
```bash
grep -rn "localhost" src/
grep -rn "super-secret" src/
```
Those results will show you the hardcoded values that need to become environment variables.
</details>

<details>
<summary>Hint 2 — validateEnv() pattern</summary>

```javascript
function validateEnv() {
  const required = ["DATABASE_URL", "JWT_SECRET"];
  const missing = required.filter((key) => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }
}
```
</details>

<details>
<summary>Hint 3 — .env.example format</summary>

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-secret-key-here
PORT=3000
NODE_ENV=development
```
</details>

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev
```

> **Note**: You'll need a local PostgreSQL instance or use a cloud-hosted one for local development.
