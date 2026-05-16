# [Your Feature Name]

## What Problem This Solves (Required — Personal Statement)
<!-- Write one specific sentence about YOUR situation. Generic answers score 0. -->
<!-- Example: "I personally review 15 PRs per week and miss risky changes in large diffs." -->
I personally [describe your specific situation]. My AI feature solves this by [specific action].

## Live URL
Backend: https://[your-app].onrender.com
Frontend: https://[your-app].vercel.app (if applicable)

## Model Used and Why
<!-- Name the exact model AND give one sentence justification. -->
Model: [exact model name, e.g. openai/gpt-4o-mini]
Reason: [one sentence — e.g. "Chosen for cost ($0.15/1M input) and reliable JSON output on structured analysis tasks."]

## Where the API Call Lives
<!-- Name the exact file AND function. -->
The AI API call is in `backend/src/services/aiService.js` in the `callAI()` function.
The prompt logic is in `backend/src/utils/promptBuilder.js` in `buildPrompt()`.

## Rate Limit
<!-- State the number AND justify it with cost math. -->
[N] requests per user per hour.
Reason: At $[X]/request, this limits a single user's AI cost to $[max] per hour.

## Running Costs
See COST_ESTIMATE.md.
Short version: $[X]/month at 100 users × 5 calls/day.

## Setup
1. cd backend && npm install
2. cp .env.example .env — add OPENROUTER_API_KEY and JWT_SECRET
3. npm start
4. cd frontend && npm install && npm run dev (if applicable)
