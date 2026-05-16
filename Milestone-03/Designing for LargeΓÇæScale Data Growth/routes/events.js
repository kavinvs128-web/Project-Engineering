const express = require('express');
const db = require('../db');
const router = express.Router();

/**
 * Ingest a new event into the tracking system.
 * This logs the raw event data and associates it with a user and session.
 */
router.post('/', async (req, res) => {
  const { user_id, session_id, event_type, properties } = req.body;
  
  try {
    const result = await db.query(
      'INSERT INTO events (user_id, session_id, event_type, properties) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, session_id, event_type, properties]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting event:', err);
    res.status(500).json({ error: 'Failed to record event' });
  }
});

/**
 * Retrieve the most recent events for a specific user.
 * Used in the dashboard to show a user's recent activity stream.
 */
router.get('/', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  try {
    // Fetch top 100 events ordered by timestamp for the specific user
    const result = await db.query(
      'SELECT * FROM events WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100',
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
