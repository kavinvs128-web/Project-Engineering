const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/products
// Returns ALL products with no pagination — this is the broken endpoint.
router.get('/products', async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(`[ShopGrid] Returned ${products.length} products`);

    res.json({ data: products });
  } catch (error) {
    console.error('[ShopGrid] Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
