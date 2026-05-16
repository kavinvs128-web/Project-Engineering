# KalviKonnect AI Backend — Starter
## Challenge 9.11: Guardrails and the Last Line of Defence

## What This App Does
Two AI endpoints for the KalviKonnect edtech platform:
- POST /notes/:id/summarize — summarises academic notes using OpenRouter
- POST /placements/:id/structure — creates interview prep plans

## Setup
1. npm install
2. cp .env.example .env — add all required values
3. npm start

## The Danger Zone
RIGHT NOW both endpoints will:
- Accept empty input and call the LLM anyway (costs money for nothing)
- Accept a 100,000-character input and call the LLM (very expensive)
- Accept injection attempts and pass them to the LLM unchanged
- Allow unlimited calls from a single user (cost abuse possible)
- Hang forever if the LLM is slow (connection never closed)
- CRASH THE SERVER if the LLM provider returns an error
- Start without OPENROUTER_API_KEY and fail silently on every request

## Your Task — Implement All Four Guardrails

### Guardrail 1 — Input Validation (create src/middleware/validateAIInput.js)
For notes: reject empty input (400), truncate at 8000 chars, detect injection patterns
For placements: reject missing rounds/questions (400), reject non-array types (400)

### Guardrail 2 — Injection Defense (inside validateAIInput.js)
Check for patterns: 'ignore your instructions', 'ignore previous', 'disregard the above', 'you are now', 'act as if', 'forget your previous', 'new instructions:'
On match: console.warn('[INJECTION_ATTEMPT]', ...) + return 400

### Guardrail 3 — Per-User Rate Limiting (create src/middleware/aiRateLimit.js)
npm install express-rate-limit
20 req/hour per user, keyed by req.user.id (not IP), 429 response with retryAfter: 3600

### Guardrail 4 — Timeout + Fallback (update src/services/aiService.js)
AbortController with 15000ms timeout on every fetch call
On AbortError: return { success: false, fallback: true, message: 'AI analysis unavailable...' }
On any error: same fallback — server MUST NOT crash
In controllers: if result.fallback → res.status(503).json(result)

### Deployment Safety (update src/server.js + .env.example)
validateEnv() throws on startup if OPENROUTER_API_KEY missing
GET /health returns { status: 'ok', timestamp: new Date().toISOString() }

## Verify Each Guardrail Works
See the assignment checklist — all 11 items must pass.
