import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import notesRouter from './routes/notes.js'
import interviewsRouter from './routes/interviews.js'
import errorsRouter from './routes/errors.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/interviews', interviewsRouter)
app.use('/api/errors', errorsRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
