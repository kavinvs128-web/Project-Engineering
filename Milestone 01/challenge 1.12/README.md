# Challenge 1.12 — Build and Deploy Your First AI Chatbot

## What This Is

This is the starter repository for Challenge 1.12. The structure is set up. Your job is to fill the gaps.

## What Exists

| File | Status | What it does |
|---|---|---|
| backend/server.js | ⚠️ Incomplete | Express server. /chat route is empty. Fill it. |
| frontend/index.html | ✅ Ready | Chat UI. Input, send button, display area all wired. |
| frontend/script.js | ⚠️ Incomplete | sendMessage() exists. Fetch call is missing. Add it. |
| frontend/style.css | ✅ Ready | Dark chat UI. No changes needed. |
| backend/.env.example | ✅ Ready | Copy to .env and add your keys. |

## What You Need to Add

### 1. Your API keys
Copy `.env.example` to `.env` inside the `backend/` folder:
```bash
cp backend/.env.example backend/.env
```
Add your OpenRouter key. Get one at openrouter.ai (free credits included).

### 2. The backend /chat route
Open `backend/server.js`. Find the TODO comment. Implement the AI API call there.

### 3. The frontend fetch call
Open `frontend/script.js`. Find the TODO comment inside `sendMessage()`. Wire it to your backend.

### 4. Conversation context
The `messages` array is already declared. Make sure you send the **full array** to the backend every time — not just the latest message. This is what makes the chatbot remember context.

## Running Locally

```bash
cd backend
npm install
npm start
```

Open `frontend/index.html` in your browser (or use VS Code Live Server).

## The Architecture

```
User → Frontend (index.html) → Your Backend (/chat) → OpenRouter API
                                     ↑
                              API key lives here
                              Never in the frontend
```

## Getting Your API Keys

**OpenRouter (primary):** openrouter.ai → API Keys → Create Key  
**Gemini (fallback, free):** aistudio.google.com → Get API Key

## Deployment

**Backend:** Render (render.com) — New Web Service → Connect repo → Build: `cd backend && npm install` → Start: `cd backend && npm start` → Add env vars in dashboard

**Frontend:** Netlify — Deploy manually → drag the `frontend/` folder

## Live Deployment

**Frontend URL:** <!-- Add after deploying -->  
**Backend URL:** <!-- Add after deploying -->

## What to Submit

1. GitHub PR link (branch: `feature/ai-chatbot`)
2. Google Drive video link (Anyone with link can view)
