const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Initialize dotenv at the top
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Health check route to verify server status
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

/**
 * AI Chat Route
 * This is where the magic happens.
 */
app.post('/chat', async (req, res) => {
  // TODO: Implement the AI chat route
  // 1. Extract `messages` from req.body
  // 2. Read API key from process.env.OPENROUTER_API_KEY
  // 3. POST to https://openrouter.ai/api/v1/chat/completions
  //    with Authorization: Bearer <key> and the messages array
  // 4. Return the AI reply as { reply: "..." }
  
  // Placeholder response (will be replaced by student)
  res.status(501).json({ error: "Method Not Implemented" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
