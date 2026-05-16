const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all transactions in the system
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM transactions');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database execution error' });
  }
});

// GET transactions by account_id
router.get('/account/:accountId', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM transactions WHERE account_id = $1', [req.params.accountId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database retrieval error' });
  }
});

// CREATE a new transaction event
router.post('/', async (req, res) => {
  const { account_id, amount, type, description } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO transactions (account_id, amount, type, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [account_id, amount, type, description]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Transaction record creation failed' });
  }
});

// DELETE single transaction permanently from the record
router.delete('/:id', async (req, res) => {
  try {
    // Hard DELETE from transactions table
    const { rowCount } = await db.query('DELETE FROM transactions WHERE id = $1', [req.params.id]);
    
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Transaction ID not found' });
    }
    
    res.json({ message: 'Transaction record permanently erased from LedgerApp' });
  } catch (err) {
    res.status(500).json({ error: 'Delete operation failed' });
  }
});

module.exports = router;
