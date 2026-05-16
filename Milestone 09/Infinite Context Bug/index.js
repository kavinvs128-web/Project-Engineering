const express = require('express')
const cors = require('cors')
const Anthropic = require('@anthropic-ai/sdk')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const sessions = new Map()

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// Clear conversation history
app.delete('/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params
  sessions.delete(sessionId)
  res.json({ message: `Session ${sessionId} cleared.` })
})

// Chat handler with context growth bug
app.post('/chat', async (req, res) => {
  const { message, sessionId } = req.body

  if (!message || !sessionId) {
    return res.status(400).json({ error: 'message and sessionId are required' })
  }

  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { history: [], turnCount: 0 })
  }

  const session = sessions.get(sessionId)
  session.history.push({ role: 'user', content: message })
  session.turnCount++

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: `You are a helpful customer support agent for CloudSync, a cloud file synchronisation SaaS.
You help users with account issues, billing questions, sync problems, and feature questions.
Be concise and professional. If you cannot resolve an issue, offer to escalate to the engineering team.`,
      messages: [...session.history]
    })

    const reply = response.content[0].text
    session.history.push({ role: 'assistant', content: reply })

    res.json({
      reply,
      turn: session.turnCount
    })

  } catch (err) {
    console.error('Anthropic API error:', err)
    res.status(500).json({ error: 'Failed to get response' })
  }
})

app.listen(port, () => {
  console.log(`SupportBot server running on http://localhost:${port}`)
})
