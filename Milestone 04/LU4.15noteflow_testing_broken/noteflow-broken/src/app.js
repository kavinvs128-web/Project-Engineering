// src/app.js
// NoteFlow API

require('dotenv').config();
const express = require('express');
const noteRoutes   = require('./routes/notes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/notes', noteRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'NoteFlow API' });
});

app.use(errorHandler);

// Only start the server if this file is run directly.
// When imported by Supertest, we export the app without listening —
// Supertest binds its own port internally.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`NoteFlow API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
