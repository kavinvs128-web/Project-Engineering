import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mount the chat router at /api
app.use('/api', chatRouter);

app.listen(PORT, () => {
    console.log(`TutorBot backend running on port 3001`);
});
