# prompt-token-audit

A simple AI-powered code review assistant.

## The Problem

This app works. But nobody has ever looked at how many tokens the system prompt costs — or whether every word in it is earning its place.

Your job is to audit the system prompt in `prompts/system-prompt.txt`, find exactly what is wasting tokens, fix it, and calculate the saving.

## Setup

1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and add your OpenRouter API key
4. Run `npm start`
5. Test: POST to `http://localhost:3000/review` with body `{ "code": "..." }`

## Your Task

Work through the 5 tasks in the assignment document. Document everything in `token-audit.md`.

Branch: `token-fix`
Submit: PR link + video drive link

## Getting an OpenRouter API Key

Go to openrouter.ai → sign up → copy your API key → paste into `.env`

Free credits are available on signup. If credits run out, get a Gemini key from aistudio.google.com (free, no card required) and update the base URL in `src/callAI.js`.
