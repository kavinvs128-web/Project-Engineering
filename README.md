# AI PR Writer

## The Problem
I kept forgetting to properly write PR descriptions after making code changes. My PRs were getting rejected because they lacked clarity, and I had to rewrite them repeatedly.

## What It Does
You paste your git diff → AI converts it into a clean PR description → you copy and use it.

## AI Integration
API: OpenRouter  
Model: openai/gpt-4o-mini  
Location: backend/server.js → /generate-pr route  

## What I Intentionally Excluded
- No authentication (not needed for MVP)
- No history storage (kept simple)
- No styling (focus on functionality)

## Monthly Cost Calculation
Model: openai/gpt-4o-mini  
Input: $0.15 / 1M tokens  
Output: $0.60 / 1M tokens  
Avg: 600 input + 400 output  

Cost per call = 0.000330  
If 300 calls → 300 × 0.000330 = $0.099  

## Live Deployment
Frontend: (add after deploy)  
Backend: (add after deploy)
