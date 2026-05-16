# JobScan AI — Pre-Deployment Starter
## Challenge 9.14: Deploy the AI Feature

## What This Is
This is the complete JobScan AI app from 9.13 with all three guardrails applied.
It is ready to deploy. Your job is to deploy it correctly and document the process.

## Local Setup
1. npm install
2. cp .env.example .env — add OPENROUTER_API_KEY and JWT_SECRET
3. npm start — verify GET /health and POST /api/analyze work locally first

## Your Deployment Task
1. Run the 6-item pre-deployment checklist (see assignment)
2. Create a Render Web Service connected to your GitHub fork
3. Add OPENROUTER_API_KEY to Render Environment dashboard (not in code)
4. Deploy and watch the build log for the two common AI deployment failures
5. Verify GET /health returns 200 at the live URL
6. Call POST /api/analyze in Postman at the LIVE URL — confirm real AI response
7. Check Render logs — confirm [AI_USAGE] line appeared for your Postman call
8. Fill in the Running Costs section in README with numbers from Render logs
9. Complete DEPLOYMENT_LOG.md
10. Submit PR with all required screenshots

---

# APP INFO: JobScan AI 

An AI-powered job description analyser built with Node.js, Express, and OpenRouter.

## Deployed URL
https://[your-app].onrender.com

## API

### POST /api/analyze
Requires: Authorization: Bearer <jwt>
Body: { "text": "job description content" }
Returns: Structured JSON analysis with title, experience level, skills, responsibilities, salary range, and remote policy.

### GET /health
Returns: { "status": "ok", "timestamp": "..." }

## Running Costs

**AI Feature:** Job description analysis
**Model:** openai/gpt-4o-mini
**Average tokens per request:** [FILL FROM RENDER LOGS]
  Prompt tokens: [X]
  Completion tokens: [Y]
**Cost per request:** ([X] × $0.15/1,000,000) + ([Y] × $0.60/1,000,000) = $[Z]
**Estimated monthly cost:**
  At [N] users × [M] calls/day × 30 days = [total requests] requests/month
  Monthly cost: [total requests] × $[Z] = $[total]/month

## Setup (Local Development)
1. npm install
2. cp .env.example .env — add your OPENROUTER_API_KEY and JWT_SECRET
3. npm start

## Production Deployment
Environment variables required on hosting platform:
- OPENROUTER_API_KEY (from https://openrouter.ai/keys)
- JWT_SECRET (generate: openssl rand -hex 32)
