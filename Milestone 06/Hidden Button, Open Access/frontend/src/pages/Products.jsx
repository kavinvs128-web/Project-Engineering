import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import ProductActions from '../components/ProductActions.jsx';
import ProductForm from '../components/ProductForm.jsx';

export default function Products() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-brand">
          <span className="brand-icon">🛍️</span>
          <span className="brand-name">ShopAdmin</span>
        </div>
        <div className="topbar-user">
          <span className="user-badge" data-role={user?.role}>
            {user?.role === 'admin' ? '🔑' : '👤'} {user?.name}
          </span>
          {/* Create button — admin only in the UI */}
          {user?.role === 'admin' && (
            <button
              id="btn-create-product"
              className="btn btn-primary"
              onClick={() => { setEditProduct(null); setShowForm(true); }}
            >
              + New Product
            </button>
          )}
          <button id="btn-logout" className="btn btn-secondary" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="content">
        <h1>Products</h1>

        {loading && <p className="status">Loading products…</p>}
        {error && <p className="status error">{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <span className="product-category">{product.category}</span>
                  <span className={`product-status ${product.published ? 'published' : 'draft'}`}>
                    {product.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  {/* ProductActions renders admin buttons — hidden for customers */}
                  <ProductActions
                    product={product}
                    token={token}
                    onDeleted={fetchProducts}
                    onEdit={() => { setEditProduct(product); setShowForm(true); }}
                    onPublishToggled={fetchProducts}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ProductForm modal — only reachable via the admin-only "+ New Product" button */}
      {showForm && (
        <ProductForm
          product={editProduct}
          token={token}
          onSaved={() => { setShowForm(false); fetchProducts(); }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
