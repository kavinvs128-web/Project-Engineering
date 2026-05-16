# NoteSnap

NoteSnap is a lightweight utility designed to help users quickly condense long study notes into concise summaries using AI.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- An API key from an OpenAI-compatible provider (Groq, Google AI Studio, or OpenRouter)

### Setup

1. **Clone the repository**
2. **Configure Environment Variables**
   - Copy the example env file: `cp .env.example .env`
   - Open `.env` and add your `API_KEY`.
3. **Install Dependencies**
   - In the `backend` directory: `npm install`
   - In the `frontend` directory: `npm install`
4. **Run the Application**
   - Terminal 1 (Backend): `cd backend && npm run dev`
   - Terminal 2 (Frontend): `cd frontend && npm run dev`

## Usage
Simply paste your notes into the text area and click "Summarise Note". The AI will process your text and display the result.

## API Keys
You can obtain free API keys from:
- [Groq Cloud](https://console.groq.com/)
- [Google AI Studio](https://aistudio.google.com/)
- [OpenRouter](https://openrouter.ai/)
