// src/controllers/placementController.js
import { structurePlacement } from '../services/aiService.js'

export async function structurePlacementController(req, res) {
  const { rounds, questions, jobDescription } = req.body
  // ❌ No check if rounds/questions exist — undefined values call the LLM
  // ❌ No type check — non-array values cause bad prompt construction
  // ❌ No try/catch — errors crash the server

  const structure = await structurePlacement(rounds, questions, jobDescription)
  res.status(200).json({ success: true, structure, placementId: req.params.id })
}
