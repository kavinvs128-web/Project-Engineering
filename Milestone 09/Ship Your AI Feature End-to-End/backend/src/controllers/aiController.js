// backend/src/controllers/aiController.js
// This controller is intentionally minimal.
// It delegates to aiService — it does NOT build prompts directly.

import { callAI } from '../services/aiService.js'

export async function aiController(req, res) {
  try {
    // Replace 'text' with your actual input field name
    const { text } = req.body

    const result = await callAI(text, req.user.id)

    // Detect fallback from aiService
    if (result?.fallback === true) {
      return res.status(503).json(result)
    }

    return res.status(200).json({
      success: true,
      result,
      // Add any metadata your frontend needs
    })
  } catch (err) {
    console.error('[CONTROLLER_ERROR]', { error: err.message, userId: req.user?.id })
    return res.status(500).json({
      error: 'server_error',
      message: 'Unable to process request. Please try again.'
    })
  }
}
