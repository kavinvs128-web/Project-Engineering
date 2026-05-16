import { analyzeJobDescription } from '../services/aiService.js'

const INPUT_MAX_LENGTH = 3000

export async function analyzeController(req, res) {
  try {
    const { text } = req.body

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        error: 'input_required',
        message: 'text field is required and must be a non-empty string.'
      })
    }

    if (text.length > INPUT_MAX_LENGTH) {
      return res.status(400).json({
        error: 'input_too_long',
        limit: INPUT_MAX_LENGTH,
        received: text.length
      })
    }

    const result = await analyzeJobDescription(text, req.user.id)

    if (result?.fallback === true) {
      return res.status(503).json(result)
    }

    return res.status(200).json({
      success: true,
      analysis: result,
      characterCount: text.length
    })
  } catch (err) {
    console.error('[ANALYZE_CONTROLLER_ERROR]', JSON.stringify({
      timestamp: new Date().toISOString(),
      error: err.message,
      userId: req.user?.id
    }))
    return res.status(500).json({
      error: 'server_error',
      message: 'Unable to process your request. Please try again.'
    })
  }
}
