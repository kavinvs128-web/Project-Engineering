import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { summarizeNoteController } from '../controllers/noteController.js'

const router = express.Router()
router.post('/:id/summarize', authMiddleware, summarizeNoteController)
export default router
