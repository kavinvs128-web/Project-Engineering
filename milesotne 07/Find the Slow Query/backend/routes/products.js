const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// SLOW ENDPOINT 1 — Missing index on 'category' column (causing Seq Scan)
// Product Listing by Category
router.get('/', async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ success: false, message: 'Category is required' });
  }

  try {
    // This query generates a SELECT * which includes the large 'description' and 'metadata' text/json fields
    // Without an index on 'category', PostgreSQL will perform a full table scan
    const products = await prisma.product.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
