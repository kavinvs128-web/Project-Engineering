import 'dotenv/config'
import express from 'express'
import { validateEnv } from './services/aiService.js'
import analyzeRouter from './routes/analyzeRoutes.js'

// Block startup if required env vars missing
validateEnv()

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'jobscan-ai'
  })
})

app.use('/api/analyze', analyzeRouter)

app.use((err, req, res, next) => {
  console.error('[UNHANDLED_ERROR]', err.message)
  res.status(500).json({ error: 'server_error', message: 'An unexpected error occurred.' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`JobScan AI running on port ${PORT}`)
})
