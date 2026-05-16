# TutorBot — AI Study Assistant

TutorBot is a web-based chat application designed to help programming students understand complex concepts and study more effectively.

## Features
- Interactive AI chat interface
- Context-aware study assistance
- Support for code examples and explanations

## Prerequisites
- Node.js (v18 or higher recommended)
- An API Key from an OpenAI-compatible provider:
  - [Groq](https://console.groq.com/) (Recommended for speed)
  - [OpenRouter](https://openrouter.ai/)
  - [Google AI Studio](https://aistudio.google.com/)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create your environment file: `cp .env.example .env`
4. Open `.env` and add your `API_KEY`.
5. Start the backend server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

### 3. Usage
- Open your browser to the URL shown by Vite (usually `http://localhost:5173`)
- Start chatting with TutorBot!

## System Requirements
- The backend runs on port 3001
- The frontend proxies API requests from `/api` to `http://localhost:3001`
