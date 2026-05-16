// src/controllers/analyzeController.js
import { analyzeJobDescription } from '../services/aiService.js'

export async function analyzeController(req, res) {
  const { text } = req.body

  // ❌ Gap 1: No input validation — empty text calls the LLM
  // ❌ Gap 1: No length check — 50,000 char inputs call the LLM at high cost
  if (!text) {
    // Only basic presence check — no length guard
    return res.status(400).json({
      error: 'missing_field',
      message: 'text field is required'
    })
  }

  // ❌ Gap 1: Should check text.length > 3000 and return 400 here
  //           Instead, all inputs proceed to the AI service

  // ❌ Gap 3: No try/catch — errors from analyzeJobDescription bubble up and crash
  const analysis = await analyzeJobDescription(text, req.user.id)

  res.status(200).json({
    success: true,
    analysis,
    characterCount: text.length
  })
}
