// src/routes/noteRoutes.js
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { summarizeNoteController } from '../controllers/noteController.js'

const router = express.Router()
// ❌ authMiddleware only — no rate limit, no input validation
router.post('/:id/summarize', authMiddleware, summarizeNoteController)
export default router
