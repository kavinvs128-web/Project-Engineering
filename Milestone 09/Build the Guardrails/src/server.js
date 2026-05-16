// src/server.js
import 'dotenv/config'
import express from 'express'
import analyzeRouter from './routes/analyzeRoutes.js'

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/analyze', analyzeRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`JobScan AI running on port ${PORT}`)
})
