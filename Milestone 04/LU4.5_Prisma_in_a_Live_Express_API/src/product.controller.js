const prisma = require('./prisma'); // ✅ use singleton

// Get all products (FIXED: Prisma instead of SQL)
async function getProducts(req, res) {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get product by ID (FIXED: null safety)
async function getProductById(req, res) {
  try {
    const id = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id }
    });

    // ✅ NULL SAFETY
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getProducts, getProductById };