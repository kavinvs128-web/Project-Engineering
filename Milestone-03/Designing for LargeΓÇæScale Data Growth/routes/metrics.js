const express = require('express');
const db = require('../db');
const router = express.Router();

/**
 * Generate a monthly summary of event types.
 * This provides high-level insights into which events are most frequent.
 */
router.get('/monthly', async (req, res) => {
  try {
    // Aggregate event counts by type for the last 30 days
    const result = await db.query(
      "SELECT COUNT(*), event_type FROM events WHERE created_at > NOW() - INTERVAL '30 days' GROUP BY event_type"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error calculating monthly metrics:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Tracks usage of specific features.
 */
router.post('/feature-usage', async (req, res) => {
  const { user_id, feature_name } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO feature_usage (user_id, feature_name, used_at) VALUES ($1, $2, NOW()) RETURNING *',
      [user_id, feature_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error recording feature usage:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
