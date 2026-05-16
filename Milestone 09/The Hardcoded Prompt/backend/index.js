import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import notesRouter from './routes/notes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
