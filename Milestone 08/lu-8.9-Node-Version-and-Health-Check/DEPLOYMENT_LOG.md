# DEPLOYMENT_LOG.md

> Fill in this document as you debug and fix the deployment. This is part of your submission.

---

## 1. What Failed?

### Error 1: Node Version Mismatch (GitHub Actions)
<!-- Paste the GitHub Actions test failure log here -->
```

```

### Error 2: Health Check Timeout (Render)
<!-- Paste the Render log message showing the deployment timeout/failure -->
```

```

---

## 2. Root Cause Analysis

Explain the root cause for each issue:

| Issue | Why it fails |
|---|---|
| **Node.js Feature Support** | |
| **Missing Check** | |

---

## 3. Fixes Applied

### Fix 1 — Environment Configurations:
- How did you pin the Node version locally (package.json)?: 
- How did you pin the Node version in CI (GitHub Actions)?: 
- How did you pin the Node version on Render (render.yaml)?: 

### Fix 2 — Health Check Implementation:
- What route did you add to the Express app?:
- How did you configure Render to ping this route?:

---

## 4. Verification

- **GitHub Actions**: (Insert screenshot of green CI run on Node 20)
- **Render Dashboard**: (Insert screenshot of deployed service with "Healthy" status)

---

## 5. Key Takeaways

<!-- What are the two main lessons about syncing environments and monitoring service health? -->
