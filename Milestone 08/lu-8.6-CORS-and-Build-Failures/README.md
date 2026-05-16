# 🔗 LinkShelf — Fix the Broken Deploy #2

## ⚡ Challenge Scenario

You're working on **LinkShelf** — a bookmark saving app with a React frontend and Express API backend. Both are deployed to Render. The backend health check passes (`GET /api/health` returns `{"status":"ok"}`), so you think everything is fine.

Then you open the frontend in your browser and try to log in. **Nothing works.** The browser console is full of red errors:

> `Access to fetch at 'https://linkshelf-api.onrender.com/api/auth/login' from origin 'https://linkshelf-frontend.onrender.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

And the frontend is showing `API URL: ⚠️ undefined` at the top.

Your job: **diagnose and fix the CORS misconfiguration and build failures** so the frontend can communicate with the backend.

---

## 🎯 Learning Objectives

By completing this challenge, you will:

- Understand what **CORS** is and why browsers enforce it
- Read **preflight OPTIONS requests** in the browser DevTools Network tab
- Configure Express CORS with a **specific origin** from an environment variable
- Ensure Vite **build-time env vars** (`VITE_*`) are set in the hosting platform
- Understand why `npx prisma generate` must run in the **build step**

---

## 🗂️ Project Structure

```
linkshelf/
├── package.json               # Backend
├── render.yaml                # Render Blueprint (has issues!)
├── .env.example
├── .gitignore
├── DEPLOYMENT_LOG.md
├── prisma/
│   └── schema.prisma
├── src/
│   ├── index.js               # CORS config lives here
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── auth.js
│       ├── bookmarks.js
│       └── health.js
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx            # Makes API calls (triggers CORS)
        └── config.js          # Reads VITE_API_URL
```

---

## 🚀 Step-by-Step Instructions

### Step 1: Observe the Failure

1. The backend is deployed and the health check passes — go verify:
   `GET https://your-backend.onrender.com/api/health`
2. Open the deployed frontend in your browser
3. Notice the `API URL: ⚠️ undefined` warning at the top
4. Open **DevTools → Network tab**
5. Try to log in — watch the requests fail
6. Read the CORS error in the Console tab

### Step 2: Understand the Errors

You should see THREE different failures:

1. **CORS error** — the browser blocks the API request because the backend doesn't allow cross-origin calls from the frontend URL
2. **API URL is undefined** — `VITE_API_URL` was not set during the frontend build, so the app doesn't know where the backend is
3. **Prisma Client crash** — even if CORS worked, the first DB query would fail because `npx prisma generate` was never run during the build

### Step 3: Apply the Fixes

Create a new branch: `fix/cors-build`

#### Fix #1 — CORS Configuration
- Open `src/index.js`
- Find the `cors()` configuration
- Replace the wildcard `"*"` with `process.env.CORS_ORIGIN`
- Enable `credentials: true` for auth headers
- Add `CORS_ORIGIN` to `validateEnv()` required list

#### Fix #2 — Frontend Build Environment
- Open `render.yaml`
- In the frontend service `envVars`, add `VITE_API_URL` pointing to your backend URL
- In the backend service `envVars`, add `CORS_ORIGIN` pointing to your frontend URL

#### Fix #3 — Build Command
- Open `render.yaml`
- Find the backend `buildCommand`
- Add `npx prisma generate` after `npm install`
- Consider also adding `npx prisma migrate deploy`

### Step 4: Configure Render Dashboard

| Service | Variable | Value |
|---|---|---|
| Backend | `CORS_ORIGIN` | `https://linkshelf-frontend.onrender.com` |
| Frontend | `VITE_API_URL` | `https://linkshelf-api.onrender.com/api` |

### Step 5: Verify

1. Redeploy both services
2. Open the frontend — the `API URL` should now show the correct backend URL
3. Try to log in / sign up
4. Open **DevTools → Network tab**:
   - The **preflight OPTIONS** request should return `200`
   - The **main POST** request should return the expected JSON response
5. Create a bookmark to verify DB calls work

### Step 6: Document

Fill in `DEPLOYMENT_LOG.md` with screenshots from the Network tab.

---

## 📤 Submission

- **GitHub PR** from branch `fix/cors-build` → `main`
- **Video** (3–5 min) showing:
  - The CORS error in the browser Network tab (before fix)
  - Your CORS configuration change
  - The preflight request succeeding (after fix)
  - A successful login + bookmark creation

---

## 📊 Rubric (10 Marks)

| Points | Criteria |
|--------|----------|
| **3** | CORS configured with specific origin from env var, not wildcard. Preflight passes in browser network tab (shown in video). |
| **3** | Frontend build passes with `VITE_API_URL` set. Render deploy log shows successful build in PR screenshot. |
| **2** | `prisma generate` present in build command. Build does not crash on DB calls. |
| **2** | `DEPLOYMENT_LOG.md` updated with CORS failure description, root cause, and fix. |
| **10** | **Total** |

---

## 💡 Hints

<details>
<summary>Hint 1 — What is CORS?</summary>

CORS (Cross-Origin Resource Sharing) is a browser security feature. When your frontend at `https://frontend.com` tries to call `https://api.com`, the browser first sends a **preflight OPTIONS** request to check if the server allows it.

The server must respond with:
```
Access-Control-Allow-Origin: https://frontend.com
```

A wildcard `*` doesn't work with credentialed requests (requests that include `Authorization` headers).
</details>

<details>
<summary>Hint 2 — How to fix CORS in Express</summary>

```javascript
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```
</details>

<details>
<summary>Hint 3 — Why is VITE_API_URL undefined?</summary>

Vite replaces `import.meta.env.VITE_*` at **build time**, not runtime. If the env var isn't set when `npm run build` runs on Render, it becomes `undefined` in the compiled JavaScript bundle.

You need to set `VITE_API_URL` in the Render dashboard **before** building the frontend.
</details>

<details>
<summary>Hint 4 — Build command fix</summary>

```yaml
buildCommand: npm install && npx prisma generate && npx prisma migrate deploy
```
</details>

---

## 🔧 Local Development

```bash
# Backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend (in a separate terminal)
cd frontend
npm install
npm run dev
```

> **Note**: Set `CORS_ORIGIN=http://localhost:5173` in your backend `.env` for local development.
