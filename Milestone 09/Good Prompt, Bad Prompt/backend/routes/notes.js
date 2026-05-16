import { Router } from 'express'
import { TASK_A_PROMPT as ORIGINAL_A } from '../../prompts/originals.js'
import { callLLM } from '../services/llmService.js'

let REWRITTEN_A
try {
  const rewrittenModule = await import('../../prompts/rewritten.js')
  REWRITTEN_A = rewrittenModule.TASK_A_PROMPT
} catch (e) {
  REWRITTEN_A = null
}

const router = Router()

router.get('/:id/review', async (req, res) => {
  const version = req.query.version === 'good' ? 'good' : 'bad'
  const temperature = parseFloat(req.query.temperature) || 0.7
  
  // Dummy content for now, simulating fetching by id
  const content = "Mitosis is when cells divide. There are 4 phases. Prophase is when chromosomes condense. Metaphase the chromosomes line up. Anaphase they split. Telophase new cells form. DNA replicates before division starts. This is important for growth and repair."

  let promptBuilder = ORIGINAL_A
  if (version === 'good' && REWRITTEN_A) {
    promptBuilder = REWRITTEN_A
  } else if (version === 'good' && !REWRITTEN_A) {
    return res.status(400).json({ error: 'Rewritten prompt not found' })
  }

  const { systemMsg, userMsg } = promptBuilder(content)
  
  try {
    const feedback = await callLLM(systemMsg, userMsg, temperature)
    res.json({ feedback })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
