const express = require('express');
const router = express.Router();
const db = require('../db');

// Get payment by order_id
router.get('/order/:order_id', async (req, res) => {
  try {
    // Problem: This might return multiple payments for the same order (Bug 3)
    const result = await db.query('SELECT * FROM payments WHERE order_id = $1', [req.params.order_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Process a payment
router.post('/', async (req, res) => {
  const { order_id, amount, status } = req.body;
  try {
    // Note: No UNIQUE check on order_id. Multiple payments for one order can be created (Bug 3).
    const result = await db.query(
      'INSERT INTO payments (order_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
      [order_id, amount, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
