const express = require('express');
const router = express.Router();
const db = require('../db');

// Add payment to an order
router.post('/', async (req, res) => {
  const { order_id, amount, status } = req.body;
  try {
    // BUG 3: Since order_id is NOT UNIQUE in payments table, this will just add a second record!
    const result = await db.query(
      'INSERT INTO payments (order_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
      [order_id, amount, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View payment history for an order
router.get('/:orderId', async (req, res) => {
  try {
    // BUG 3 Symptom: Returns two rows for the same order_id, potentially showing both 'pending' and 'completed'!!
    const result = await db.query(
      'SELECT * FROM payments WHERE order_id = $1 ORDER BY created_at DESC',
      [req.params.orderId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
