import { Router } from 'express'
import { TASK_C_PROMPT as ORIGINAL_C } from '../../prompts/originals.js'
import { callLLM } from '../services/llmService.js'

let REWRITTEN_C
try {
  const rewrittenModule = await import('../../prompts/rewritten.js')
  REWRITTEN_C = rewrittenModule.TASK_C_PROMPT
} catch (e) {
  REWRITTEN_C = null
}

const router = Router()

router.post('/analyse', async (req, res) => {
  const version = req.query.version === 'good' ? 'good' : 'bad'
  const temperature = parseFloat(req.query.temperature) || 0.7
  
  const { error_message } = req.body

  if (!error_message) {
    return res.status(400).json({ error: 'error_message is required' })
  }

  let promptBuilder = ORIGINAL_C
  if (version === 'good' && REWRITTEN_C) {
    promptBuilder = REWRITTEN_C
  } else if (version === 'good' && !REWRITTEN_C) {
    return res.status(400).json({ error: 'Rewritten prompt not found' })
  }

  const { systemMsg, userMsg } = promptBuilder(error_message)
  
  try {
    const analysis = await callLLM(systemMsg, userMsg, temperature)
    res.json({ analysis })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
