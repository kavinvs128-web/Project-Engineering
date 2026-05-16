# JobScan AI — Starter Repository
## Challenge 9.13: Build the Guardrails

## What This App Does
JobScan AI analyses job descriptions and returns structured data:
required skills, experience level, responsibilities, salary range, and remote policy.

## Setup
1. npm install
2. cp .env.example .env — add OPENROUTER_API_KEY and JWT_SECRET
3. npm start — server starts at http://localhost:3000

## Endpoint
POST /api/analyze
Body: { "text": "job description text here" }
Auth: Authorization: Bearer <jwt-token>

## Health Check
GET /health → { "status": "ok" }

## The Three Gaps You Need to Fix

### Gap 1 — No Input Length Validation (src/controllers/analyzeController.js)
The controller accepts any text length. A 50,000-character input calls the LLM.
Fix: Add a check — if text.length > 3000, return 400 with { error: 'input_too_long', limit: 3000, received: text.length }

### Gap 2 — No Request Timeout (src/services/aiService.js)
The LLM fetch call has no timeout. If the provider is slow, the request hangs forever.
Fix: Add AbortController with 15000ms timeout, pass signal to fetch, return fallback on AbortError.

### Gap 3 — No LLM Error Handling (src/services/aiService.js)
The LLM call has no try/catch. Any provider error crashes the Node.js process.
Fix: Wrap the full LLM call in try/catch, log the error, return { success: false, fallback: true, message: '...' }

## Reproducing the Failures
BEFORE fixing anything, reproduce each failure and document it in GUARDRAILS.md.
See the assignment for exact reproduction steps.
