const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const healthRoutes = require('./routes/healthRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Log that we've read the database URL (simulating connection setup)
if (process.env.DATABASE_URL) {
  console.log('Database configuration loaded.');
} else {
  console.warn('Warning: DATABASE_URL is not defined in .env');
}

app.use(express.json());

// Routes
app.use('/health', healthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
