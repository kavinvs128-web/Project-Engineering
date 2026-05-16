// src/routes/placementRoutes.js
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { structurePlacementController } from '../controllers/placementController.js'

const router = express.Router()
// ❌ authMiddleware only — no rate limit, no input validation
router.post('/:id/structure', authMiddleware, structurePlacementController)
export default router
