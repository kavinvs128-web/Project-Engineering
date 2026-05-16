const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { verifyToken } = require('../middleware/auth');

// List
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Create
router.post('/', verifyToken, async (req, res) => {
  const { name, description, price, stock } = req.body;
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can create products' });
  }

  try {
    const product = await prisma.product.create({
      data: { name, description, price, stock },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
