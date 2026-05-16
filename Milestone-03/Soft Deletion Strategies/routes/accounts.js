const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all accounts in the system
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM accounts');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database execution error' });
  }
});

// GET user accounts by user_id
router.get('/user/:userId', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM accounts WHERE user_id = $1', [req.params.userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database retrieval error' });
  }
});

// CREATE a new account for a user
router.post('/', async (req, res) => {
  const { user_id, account_type, balance } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO accounts (user_id, account_type, balance) VALUES ($1, $2, $3) RETURNING *',
      [user_id, account_type, balance]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Account creation failed' });
  }
});

// DELETE single account permanently from the system
router.delete('/:id', async (req, res) => {
  try {
    // Hard DELETE from accounts table
    const { rowCount } = await db.query('DELETE FROM accounts WHERE id = $1', [req.params.id]);
    
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }
    
    res.json({ message: 'Account permanently deleted from LedgerApp' });
  } catch (err) {
    res.status(500).json({ error: 'Delete operation failed' });
  }
});

module.exports = router;
