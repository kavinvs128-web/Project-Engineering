import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

// THE BROKEN FRONTEND
// - Fetches ALL products from /api/products on mount
// - Renders every product card in one flat list
// - No page state, no pagination UI, no onPageChange handlers
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setProducts(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="state-loading">
        <div className="spinner" />
        <span>Loading all products…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-error">
        <span className="error-title">Failed to load products</span>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">All Products</h1>
        <span className="products-count">Showing all {products.length} products</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
