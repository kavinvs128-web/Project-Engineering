const express = require('express');
const prisma = require('../prisma');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// READ ROUTES — verifyToken required
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/products
 * Returns all products (published and unpublished).
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/products/:id
 * Returns a single product by ID.
 */
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// WRITE ROUTES — verifyToken applied, NO requireRole check
// Any authenticated user (including customers) can call these routes.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /api/products
 * Creates a new product.
 * Protected by: verifyToken only — NO role check
 */
router.post('/', verifyToken, async (req, res) => {
  const { name, description, price, category, published } = req.body;

  if (!name || !description || price === undefined || !category) {
    return res.status(400).json({ error: 'name, description, price, and category are required' });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        published: published ?? false,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/products/:id
 * Updates an existing product.
 * Protected by: verifyToken only — NO role check
 */
router.put('/:id', verifyToken, async (req, res) => {
  const { name, description, price, category, published } = req.body;

  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });

    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: name ?? existing.name,
        description: description ?? existing.description,
        price: price !== undefined ? parseFloat(price) : existing.price,
        category: category ?? existing.category,
        published: published !== undefined ? published : existing.published,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/products/:id
 * Deletes a product by ID.
 * Protected by: verifyToken only — NO role check
 *
 * A customer with a valid JWT CAN call this endpoint and receive HTTP 200.
 */
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });

    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const deleted = await prisma.product.delete({ where: { id: req.params.id } });

    res.json({
      success: true,
      message: 'Product deleted',
      deleted: { id: deleted.id, name: deleted.name },
    });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PATCH /api/products/:id/publish
 * Toggles the published boolean on a product.
 * Protected by: verifyToken only — NO role check
 */
router.patch('/:id/publish', verifyToken, async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: req.params.id } });

    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: { published: !existing.published },
    });

    res.json(updated);
  } catch (err) {
    console.error('Publish toggle error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
