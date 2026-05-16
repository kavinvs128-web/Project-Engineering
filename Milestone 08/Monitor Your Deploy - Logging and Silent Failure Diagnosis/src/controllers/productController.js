import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    // Bug: category can be undefined — returns empty array with no error
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  } catch (err) {
    // No console.error — errors swallowed silently
    res.status(500).json({ error: 'Server error' });
  }
};
