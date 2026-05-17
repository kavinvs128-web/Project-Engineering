/**
 * Dev Confessions API - Main Application File
 * 
 * This application allows developers to anonymously share confessions.
 * Architecture:
 * - Routes: Define HTTP endpoints (/src/routes)
 * - Controllers: Handle HTTP requests/responses (/src/controllers)
 * - Services: Contain business logic and data operations (/src/services)
 * - Utils: Constants and validation helpers (/src/utils)
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const confessionRoutes = require('./src/routes/confessions');
const { PORT } = require('./src/utils/constants');

// Initialize Express application
const app = express();

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Routes: Mount confession routes at /api/v1
// Why: Centralized route management with versioning for API evolution
app.use('/api/v1', confessionRoutes);

// Health check endpoint for deployment verification
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dev Confessions API is running' });
});

// Error handling for 404 (route not found)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`[SERVER] Dev Confessions API running on port ${PORT}`);
  console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
});