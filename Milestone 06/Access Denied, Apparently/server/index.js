import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Event Manager API (Starter) - In-memory Storage');
});

app.listen(PORT, () => {
    console.log(`Starter Server is running on http://localhost:${PORT}`);
});
