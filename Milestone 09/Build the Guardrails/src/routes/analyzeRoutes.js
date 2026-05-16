// src/routes/analyzeRoutes.js
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { analyzeController } from '../controllers/analyzeController.js'

const router = express.Router()
router.post('/', authMiddleware, analyzeController)
export default router
