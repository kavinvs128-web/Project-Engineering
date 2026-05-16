// backend/src/middleware/validateInput.js
// CONSTRAINT 5: Input validation — length check + at least one content check.
// Adjust field name, max length, and content check for your specific feature.

const MAX_INPUT_LENGTH = 3000  // Adjust based on your token budget

export function validateAIInput(req, res, next) {
  // Replace 'text' with your actual input field name
  const { text } = req.body

  // Check 1: Content existence
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({
      error: 'input_required',
      message: 'Input text is required.'  // Update message for your feature
    })
  }

  // Check 2: Length guard (cost protection)
  if (text.length > MAX_INPUT_LENGTH) {
    return res.status(400).json({
      error: 'input_too_long',
      limit: MAX_INPUT_LENGTH,
      received: text.length
    })
  }

  // Check 3: Add your domain-specific content check here
  // Examples:
  // - For email scorer: check it looks like an email (contains @ or common email words)
  // - For PR reviewer: check it contains common diff markers (+, -, @@)
  // - For interview coach: check minimum length (answer must be at least 100 chars)
  // if (yourCondition) { return res.status(400).json({ error: '...' }) }

  next()
}
