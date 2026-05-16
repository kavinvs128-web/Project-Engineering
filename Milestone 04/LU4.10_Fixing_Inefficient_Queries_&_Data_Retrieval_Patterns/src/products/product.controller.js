import { getProducts, getProductById } from './product.service.js';

export async function listProducts(req, res) {
  try {
    // ❌ Raw query params passed directly, no validation
    const products = await getProducts(req.query);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getProduct(req, res) {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}