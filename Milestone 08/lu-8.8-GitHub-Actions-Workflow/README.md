# 🚀 TaskPulse — Write Your First GitHub Actions Workflow

## ⚡ Challenge Scenario

You've built **TaskPulse** — a simple task tracking API. The app works locally and is deployed to Render. But right now, every time you want to deploy, you have to:

1. Run tests manually
2. Push to GitHub
3. Go to Render dashboard
4. Click "Manual Deploy"
5. Hope nothing breaks

Your team lead says:

> *"We need CI/CD. Write a GitHub Actions workflow that automatically tests and deploys on every push to main. If the tests fail, the deploy should never happen."*

Your job: **complete the workflow YAML file** so the entire pipeline is automated.

---

## 🎯 Learning Objectives

By completing this challenge, you will:

- Write a **GitHub Actions workflow** from scratch
- Use `actions/checkout` and `actions/setup-node`
- Understand `npm ci` vs `npm install` for CI environments
- Gate deployments behind **passing tests**
- Trigger Render deployment using a **deploy hook URL**
- Store sensitive values in **GitHub Secrets**

---

## 🗂️ Project Structure

```
taskpulse-api/
├── .github/
│   └── workflows/
│       └── deploy.yml         ← YOUR CHALLENGE (fill in the TODOs)
├── package.json
├── .gitignore
├── .env.example
├── src/
│   ├── server.js
│   └── routes/
│       └── health.js
└── tests/
    └── health.test.js         ← Tests that your workflow will run
```

---

## 🚀 Step-by-Step Instructions

### Step 1: Understand the Existing Code

The app is simple — an Express server with a health check endpoint. The test suite (`tests/health.test.js`) verifies the health check works. Run the tests locally:

```bash
npm install
npm test
```

All 3 tests should pass.

### Step 2: Open the Workflow File

Open `.github/workflows/deploy.yml`. You'll see a skeleton with 6 TODOs:

| TODO | What to Write |
|------|---------------|
| 1 | Trigger: `on push to main` |
| 2 | Step: Checkout code (`actions/checkout@v4`) |
| 3 | Step: Setup Node.js 20 (`actions/setup-node@v4`) |
| 4 | Step: Install deps (`npm ci`) |
| 5 | Step: Run tests (`npm test`) |
| 6 | Step: Deploy to Render (`curl` with deploy hook) |

### Step 3: Complete Each TODO

Fill in the YAML under each TODO comment. Here's the structure of a workflow step:

```yaml
- name: Step Name
  uses: action/name@version    # for pre-built actions
  with:                         # action-specific inputs
    key: value

- name: Step Name
  run: command                  # for shell commands
```

### Step 4: Set Up the GitHub Secret

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `RENDER_DEPLOY_HOOK_URL`
4. Value: Copy the deploy hook URL from your Render dashboard (Settings → Deploy Hook)

### Step 5: Push and Watch

1. Commit your completed `deploy.yml`
2. Push to the `main` branch
3. Go to the **Actions** tab in your GitHub repo
4. Watch the workflow run — you should see each step execute in order
5. If tests pass → Render deployment is triggered
6. If tests fail → deployment is **skipped** (the safety gate works!)

### Step 6: Test the Safety Gate

1. Intentionally break a test (e.g., change expected status to 500)
2. Push to main
3. Watch the workflow — it should **fail** at the test step
4. The deploy step should **never run**
5. Fix the test, push again — workflow passes and deploys

---

## 📤 Submission

- **GitHub PR** showing `.github/workflows/deploy.yml`
- **Screenshot** of a green (passing) workflow run in GitHub Actions tab (add to README)
- **Video** (3–5 min) walking through:
  - Each step of the workflow YAML and what it does
  - What happens when `npm test` fails (show the safety gate)
  - The Render dashboard showing a triggered deployment

---

## 📊 Rubric (10 Marks)

| Points | Criteria |
|--------|----------|
| **3** | Workflow file present and syntactically correct. All 5 steps in correct order: checkout, setup-node, npm ci, npm test, curl deploy hook. |
| **3** | GitHub Actions screenshot shows green (passing) workflow run on push to main. Render deployment triggered as a result. |
| **2** | Secrets used correctly: deploy hook URL is in `secrets.RENDER_DEPLOY_HOOK_URL`, not hardcoded in the YAML. |
| **2** | Video walks through each step of the workflow YAML and explains what happens if `npm test` fails. |
| **10** | **Total** |

---

## 💡 Hints

<details>
<summary>Hint 1 — Workflow trigger syntax</summary>

```yaml
on:
  push:
    branches:
      - main
```
</details>

<details>
<summary>Hint 2 — Using a pre-built action</summary>

```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

No `run:` needed — `uses:` tells GitHub to run a pre-built action.
</details>

<details>
<summary>Hint 3 — npm ci vs npm install</summary>

| Command | Use Case | Speed | Reproducible |
|---|---|---|---|
| `npm install` | Local dev | Slower | No (resolves versions) |
| `npm ci` | CI/CD pipelines | Faster | Yes (uses lockfile exactly) |

`npm ci` also deletes `node_modules` first for a clean install.
</details>

<details>
<summary>Hint 4 — curl with deploy hook</summary>

```yaml
- name: Deploy to Render
  run: curl --fail -X POST ${{ secrets.RENDER_DEPLOY_HOOK_URL }}
```

- `--fail` makes curl return a non-zero exit code if the HTTP request fails
- `${{ secrets.RENDER_DEPLOY_HOOK_URL }}` reads from GitHub Secrets
</details>

---

## 🔧 Local Development

```bash
npm install
npm test     # Run the tests
npm run dev  # Start the server
```
