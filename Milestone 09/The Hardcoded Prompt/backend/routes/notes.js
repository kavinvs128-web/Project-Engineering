import express from 'express';
import { callAI } from '../services/aiService.js';

const router = express.Router();

router.post('/summarize', async (req, res) => {
  console.log('[NoteSnap] Summarize request received');
  
  // THE HARDCODED PROMPT: No system message, no output constraints, no JSON instructions
  const prompt = 'summarize this note: ' + req.body.text;

  // Passing prompt with an empty system message
  const aiResponse = await callAI(prompt, '');

  // Sending back the raw string response
  res.json({ result: aiResponse });
});

export default router;
