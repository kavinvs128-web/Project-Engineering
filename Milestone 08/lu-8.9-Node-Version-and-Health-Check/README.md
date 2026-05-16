# 🌤️ WeatherDash — Fix the Broken Deploy #4

## ⚡ Challenge Scenario

Your team just built **WeatherDash** — a blazing fast API that fetches and sorts weather forecast data. 

You tested the `GET /api/weather/forecast?sort=temp` route on your local machine. It works perfectly! All your local Jest tests pass.

But then you push the code, and everything falls apart:
1. **GitHub Actions:** The CI workflow fails. The test for the `sort=temp` route throws a `500 Internal Server error`.
2. **Render Deploy:** Render builds the app, the server starts, but Render eventually marks the deploy as **FAILED**. It says the service "never became healthy."

You check the server code. There's a comment noting the use of `.toSorted()` — a brand-new feature introduced in **Node.js v20.0.0**.

Your job: **Ensure all environments (Dev, CI, Prod) run the exact same Node version (Node 20+), and add a standard health check so Render knows the service is alive.**

---

## 🎯 Learning Objectives

By completing this challenge, you will:

- Fix "works on my machine" bugs by **synchronizing Node.js versions** across local, CI, and hosting environments.
- Use the `engines` field in `package.json` to enforce language versions.
- Implement an HTTP **Health Check endpoint** (`GET /health`).
- Configure a PaaS platform (Render) to verify service health via the `healthCheckPath` setting.

---

## 🗂️ Project Structure

```
weatherdash-api/
├── package.json               # Bug #1: Missing "engines" field!
├── render.yaml                # Bug #2 & Bug #4: Missing node version and health check config!
├── src/
│   ├── server.js              # Bug #4: Missing /health route
│   └── routes/
│       └── weather.js         # Requires Note 20 to run without crashing
├── tests/
│   └── weather.test.js        # Fails in CI because of old Node version
└── .github/
    └── workflows/
        └── ci.yml             # Bug #3: Hardcoded to Node 18!
```

---

## 🚀 Step-by-Step Instructions

### Step 1: Diagnose GitHub Actions Failure
1. Push this broken repo to your own GitHub account.
2. Go to the **Actions** tab.
3. Watch the `CI Pipeline` workflow fail.
4. Open the failed job and look closely at the `Run tests` step. You'll see:
   `TypeError: mockForecast.toSorted is not a function`.

### Step 2: Fix the Node Version Everywhere

Create a branch: `fix/node-health`

**Fix 1: Local / `package.json`**
Add the `engines` field to `package.json` to declare that this project requires Node 20 or higher.
```json
"engines": {
  "node": ">=20.0.0"
}
```

**Fix 2: CI / GitHub Actions**
Open `.github/workflows/ci.yml`. Find the `Setup Node.js` step.
Change `node-version: '18'` to `node-version: '20'`.

**Fix 3: Prod / Render**
Open `render.yaml`. In the `envVars` section, explicitly tell Render to use Node 20 by setting `NODE_VERSION`.
```yaml
envVars:
  - key: NODE_VERSION
    value: '20'
```

### Step 3: Implement the Health Check

Hosting platforms need a way to know your app actually fully booted and can serve traffic. They do this by pinging a specific URL.

**Fix 4: Create the endpoint**
Open `src/server.js`. Before the global error handler, add a health check route:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});
```

**Fix 5: Tell Render about the endpoint**
Open `render.yaml`. Below `startCommand`, configure Render to query your new endpoint before marking the deploy as successful:
```yaml
healthCheckPath: /health
```

### Step 4: Verify
1. Commit and push your changes.
2. Verify GitHub Actions turns **GREEN** (passing tests).
3. Connect the repo to Render using the Blueprint. Provide a deployment name.
4. Verify the Render dashboard eventually shows a **Healthy** status badge.
5. In your browser, manually test `https://your-app.onrender.com/api/weather/forecast?sort=temp` and ensure you get sorted JSON, not a 500 error.

### Step 5: Document
Fill in the `DEPLOYMENT_LOG.md`.

---

## 📤 Submission

- **GitHub PR** from branch `fix/node-health` → `main`
- **Video** (3–5 min) showing:
  - The initial CI failure log (`toSorted is not a function`)
  - Showing how you updated versions in `package.json`, `ci.yml`, and `render.yaml`
  - Explaining the `/health` endpoint and how it integrates with Render
  - Showing a "Healthy" deployed service in Render

---

## 📊 Rubric (10 Marks)

| Points | Criteria |
|--------|----------|
| **3** | `engines` field added to package.json. Render env var `NODE_VERSION` defined. GitHub Actions updated to Node 20. |
| **3** | `GET /health` endpoint added to server code returning 200. `healthCheckPath` added to `render.yaml`. |
| **2** | Screenshots provided in PR showing Green GitHub action AND Render dashboard "Healthy" status. |
| **2** | `DEPLOYMENT_LOG.md` is filled out with root cause and deployed/failed logs. |
| **10** | **Total** |

---

## 💡 Hints

<details>
<summary>Hint 1 — "Works on my machine!"</summary>

The #1 cause of "works on my machine" is different underlying dependencies. Local devs tend to install the latest version of everything (e.g. Node 22). CI servers use whatever image they pull (e.g. ubuntu-latest defaults). PaaS servers (Render, Heroku) use stable LTS versions (Node 18).

Explicitly setting versions across all 3 layers (`engines`, GitHub Action inputs, `NODE_VERSION` env vars) guarantees consistency.
</details>

<details>
<summary>Hint 2 — Why doesn't Render know it's running?</summary>

Normally, if a server binds to the correct port (`process.env.PORT`), Render assumes it works. However, the best practice is an explicit Health Check. If you define a `healthCheckPath`, Render waits until that specific URL returns an HTTP `200` response before routing public internet traffic to the container. If it never returns 200, the deploy is aborted safely.
</details>
