# AI Chatbot

## What I Built
A full-stack AI chatbot using Node.js, Express, and a vanilla JavaScript frontend. It supports real-time conversation with memory.

## API and Model
API: OpenRouter  
Model: openai/gpt-4o-mini  

Why backend only: If API keys are placed in frontend JavaScript, they can be easily accessed using browser DevTools and abused by others, leading to unauthorized usage and billing issues.

Fallback provider: Google Gemini API.  
Changes required:
1. Change base URL  
2. Change model name to gemini-1.5-flash  

## Live Deployment
Frontend: https://your-frontend-url  
Backend: https://your-backend-url