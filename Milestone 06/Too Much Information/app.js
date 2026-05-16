import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());

// API Routes
app.use('/auth', authRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'up' });
});

export default app;
