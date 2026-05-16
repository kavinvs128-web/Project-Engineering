const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products
router.get('/', async (req, res) => {
  try {
    // Problem: This will return products with negative inventory (Bug 2)
    const result = await db.query('SELECT * FROM products ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { name, sku, inventory_count, price } = req.body;
  try {
    // Inventory count should not be negative, but missing CHECK constraint (Bug 2)
    const result = await db.query(
      'INSERT INTO products (name, sku, inventory_count, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, sku, inventory_count, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product inventory manually
router.patch('/:id/inventory', async (req, res) => {
  const { inventory_count } = req.body;
  try {
    const result = await db.query(
      'UPDATE products SET inventory_count = $1 WHERE id = $2 RETURNING *',
      [inventory_count, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
