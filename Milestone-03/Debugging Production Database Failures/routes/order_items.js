const express = require('express');
const router = express.Router();
const db = require('../db');

// Add item to order AND decrement product inventory
router.post('/', async (req, res) => {
  const { order_id, product_id, quantity, unit_price } = req.body;
  try {
    // 1. Logically, we should check if product.inventory >= quantity, but this app just subtracts.
    // 2. We should use a transaction, but the developer just ran them one after another.
    
    // Create order item
    const itemResult = await db.query(
      'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [order_id, product_id, quantity, unit_price]
    );
    
    // Decrement product inventory (BUG 2 Symptom: goes negative)
    await db.query(
      'UPDATE products SET inventory_count = inventory_count - $1 WHERE id = $2',
      [quantity, product_id]
    );

    res.status(201).json(itemResult.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List items for an order
router.get('/:orderId', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT oi.id, oi.quantity, oi.unit_price, p.name as product_name 
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [req.params.orderId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
