import { Router } from 'express'
import { TASK_B_PROMPT as ORIGINAL_B } from '../../prompts/originals.js'
import { callLLM } from '../services/llmService.js'

let REWRITTEN_B
try {
  const rewrittenModule = await import('../../prompts/rewritten.js')
  REWRITTEN_B = rewrittenModule.TASK_B_PROMPT
} catch (e) {
  REWRITTEN_B = null
}

const router = Router()

router.get('/:id/summary', async (req, res) => {
  const version = req.query.version === 'good' ? 'good' : 'bad'
  const temperature = parseFloat(req.query.temperature) || 0.7
  
  // Dummy content for now, simulating fetching by id
  const text = "I interviewed at Google for a SWE intern role in March. The interview had 3 rounds. First was a screening call, then two technical rounds. They asked me about arrays and dynamic programming. I solved the first problem easily but struggled with the DP one. I was given an offer but turned it down due to relocation. The interviewers were nice and gave good feedback about my problem-solving approach."

  let promptBuilder = ORIGINAL_B
  if (version === 'good' && REWRITTEN_B) {
    promptBuilder = REWRITTEN_B
  } else if (version === 'good' && !REWRITTEN_B) {
    return res.status(400).json({ error: 'Rewritten prompt not found' })
  }

  const { systemMsg, userMsg } = promptBuilder(text)
  
  try {
    const summary = await callLLM(systemMsg, userMsg, temperature)
    res.json({ summary })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
