# NoteAI — Starter Repository

## Challenge 9.10: How Much Will This Cost?

## What This App Does
NoteAI summarises academic notes using OpenRouter AI.
Send a note → receive a structured JSON summary with overview, key concepts, and exam questions.

## Setup
1. npm install
2. cp .env.example .env
3. Add your OPENROUTER_API_KEY to .env (get one at openrouter.ai/keys)
4. npm start — server starts at http://localhost:3000

## Test Credentials
For testing, generate a JWT manually:
node -e "const jwt = require('jsonwebtoken'); console.log(jwt.sign({userId: '1', email: 'test@test.com'}, 'your-secret', {expiresIn: '1d'}))"

## Endpoints
POST /notes/:id/summarize
Body: { "noteContent": "your note text here" }
Auth: Authorization: Bearer <jwt-token>

## Sample Call
```bash
curl -X POST http://localhost:3000/notes/1/summarize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt>" \
  -d '{"noteContent": "Photosynthesis is the process by which plants..."}'
```

## The Gap You Need to Fill
Open src/services/aiService.js. Find the TODO comment.
The data.usage object (with prompt_tokens, completion_tokens, total_tokens)
is available after every LLM call — but nobody is reading it.
Add the logging. Run 5 test calls. Fill in COST_ESTIMATE.md.

## Test Notes
Use the files in test/ for your 5 test calls:
- test/short-note.txt (~200 words)
- test/medium-note.txt (~500 words)
- test/long-note.txt (~800 words)
