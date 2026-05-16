import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { validateEnv } from './services/aiService.js'
import aiRouter from './routes/aiRoutes.js'

// Block startup if API key missing
validateEnv()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Health check — required for Render and the PR verification
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Mount your AI routes — update the path if needed
app.use('/api', aiRouter)

app.use((err, req, res, next) => {
  console.error('[UNHANDLED_ERROR]', err.message)
  res.status(500).json({ error: 'server_error', message: 'An unexpected error occurred.' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`AI Feature backend running on port ${PORT}`)
})
