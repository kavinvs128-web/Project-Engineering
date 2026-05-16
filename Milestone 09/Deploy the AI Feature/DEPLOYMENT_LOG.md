# JobScan AI — Deployment Log

## Pre-Deployment Checks

| Check | Result | Notes |
|---|---|---|
| API key NOT in source files (grep check) | [PASS/FAIL] | |
| .env in .gitignore | [PASS/FAIL] | |
| .env.example committed with placeholder | [PASS/FAIL] | |
| validateEnv() blocks startup without key | [PASS/FAIL] | |
| GET /health returns 200 locally | [PASS/FAIL] | |
| AI endpoint returns real response locally | [PASS/FAIL] | |

## Deployment Steps

| Step | Timestamp | Result |
|---|---|---|
| Pushed to main | | |
| Render build started | | |
| Build completed | | |
| Service live | | |

## Failures Encountered

[Describe any failures here. For each:]
- Symptom:
- Render log line that revealed it:
- Fix applied:
- Log after fix:

## Live Verification Evidence

Deployed URL: https://[your-app].onrender.com

Health check: curl https://[url]/health
Response: [paste here]

AI endpoint test:
Request body: [paste the job description you tested with]
Response: [paste the full JSON response]

Render [AI_USAGE] log line: [paste the exact log line from Render dashboard]
