const express = require('express');
const router = express.Router();
const db = require('../db');

// List all products
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product inventory
router.patch('/:id/inventory', async (req, res) => {
  const { adjustment } = req.body;
  try {
    // Inefficiently updates inventory without checking for negative values
    const result = await db.query(
      'UPDATE products SET inventory_count = inventory_count + $1 WHERE id = $2 RETURNING *',
      [adjustment, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
