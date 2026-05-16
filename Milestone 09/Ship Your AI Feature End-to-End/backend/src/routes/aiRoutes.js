// backend/src/routes/aiRoutes.js
// MIDDLEWARE ORDER IS A CONSTRAINT — do not change the sequence.
// 1. authMiddleware — sets req.user.id (required by aiRateLimit)
// 2. aiRateLimit — uses req.user.id (fails without authMiddleware first)
// 3. validateAIInput — validates input before LLM call
// 4. aiController — calls LLM only if all above pass

import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { aiRateLimit } from '../middleware/aiRateLimit.js'
import { validateAIInput } from '../middleware/validateInput.js'
import { aiController } from '../controllers/aiController.js'

const router = express.Router()

// Update '/analyze' to a path that reflects your feature
router.post('/analyze', authMiddleware, aiRateLimit, validateAIInput, aiController)

export default router
