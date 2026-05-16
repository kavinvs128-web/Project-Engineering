const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');
const noteRoutes = require('./routes/notes');

const app = express();

// Middleware
app.use(cors()); // Allow all cross-origin requests
app.use(express.json());

// Connect DB
connectDB();

// intentionally missing some global error handling
// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
