const express = require('express');
const db = require('../db');
const router = express.Router();

/**
 * Start a new user session.
 */
router.post('/start', async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO sessions (user_id, started_at) VALUES ($1, NOW()) RETURNING *',
      [user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error starting session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * List all currently active sessions (sessions that haven't ended).
 * This is used for real-time monitoring of concurrent users.
 */
router.get('/active', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM sessions WHERE ended_at IS NULL'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching active sessions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
