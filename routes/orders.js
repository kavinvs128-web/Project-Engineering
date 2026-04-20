const express = require('express');
const router = express.Router();
const db = require('../db');

// List all orders with customer names
router.get('/', async (req, res) => {
  try {
    // BUG 1 Symptom: Orders joined with customers will return NULL for customer_name if the customer_id is orphaned
    const query = `
      SELECT o.id, o.status, o.total, o.created_at, c.name AS customer_name 
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

// Create new order
router.post('/', async (req, res) => {
  const { customer_id, total } = req.body;
  try {
    // Lack of foreign key means any random customer_id is allowed!
    const result = await db.query(
      'INSERT INTO orders (customer_id, total, status) VALUES ($1, $2, $3) RETURNING *',
      [customer_id, total, 'pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
