const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all orders with customer details
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT o.id, o.customer_id, c.name as customer_name, o.status, o.total, o.created_at
      FROM orders o
      LEFT JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const { customer_id, total } = req.body;
  try {
    // Note: No check for valid customer_id because of missing FK (Bug 1)
    const result = await db.query(
      'INSERT INTO orders (customer_id, total) VALUES ($1, $2) RETURNING *',
      [customer_id, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const result = await db.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
