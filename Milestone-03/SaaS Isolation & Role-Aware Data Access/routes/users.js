const express = require('express');
const router = express.Router();
const db = require('../db');

// List all users for the workforce manager
router.get('/', async (req, res) => {
  try {
    // Deliberately selects all fields, exposing sensitive data
    const { rows } = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
});

// Single user profile view
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to find user.' });
  }
});

module.exports = router;
