import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { aiRateLimit } from '../middleware/aiRateLimit.js'
import { analyzeController } from '../controllers/analyzeController.js'

const router = express.Router()
router.post('/', authMiddleware, aiRateLimit, analyzeController)
export default router
