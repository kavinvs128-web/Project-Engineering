const express = require('express');
const router = express.Router();
const db = require('../db');

// Add item to an order
router.post('/', async (req, res) => {
  const { order_id, product_id, quantity, unit_price } = req.body;
  try {
    // 1. Check if product exists first
    const productCheck = await db.query('SELECT inventory_count FROM products WHERE id = $1', [product_id]);
    if (productCheck.rows.length === 0) return res.status(404).json({ error: 'Product not found' });

    // 2. No check for current inventory <= 0 or current inventory - requested quantity < 0
    // Decrement inventory (Bug 2 related: missing CHECK constraint)
    await db.query(
      'UPDATE products SET inventory_count = inventory_count - $1 WHERE id = $2',
      [quantity, product_id]
    );

    // 3. Insert order item
    const result = await db.query(
      'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [order_id, product_id, quantity, unit_price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get items by order_id
router.get('/order/:order_id', async (req, res) => {
  try {
    const query = `
      SELECT oi.*, p.name as product_name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `;
    const result = await db.query(query, [req.params.order_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
