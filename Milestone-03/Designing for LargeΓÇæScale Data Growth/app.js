const express = require('express');
require('dotenv').config();

const eventRoutes = require('./routes/events');
const sessionRoutes = require('./routes/sessions');
const metricRoutes = require('./routes/metrics');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/events', eventRoutes);
app.use('/sessions', sessionRoutes);
app.use('/metrics', metricRoutes);

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'up', timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`TrackFlow API running on port ${PORT}`);
  console.log('Database connected and ready for events.');
});
