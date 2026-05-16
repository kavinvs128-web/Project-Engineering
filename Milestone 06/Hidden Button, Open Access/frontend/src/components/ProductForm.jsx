import React, { useState } from 'react';

export default function ProductForm({ product, token, onSaved, onCancel }) {
  const isEditing = !!product;

  const [form, setForm] = useState({
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product?.price ?? '',
    category: product?.category ?? '',
    published: product?.published ?? false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isEditing ? `/api/products/${product.id}` : '/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Save failed');
        return;
      }

      onSaved();
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? 'Edit Product' : 'New Product'}</h2>

        <form id="product-form" onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="pf-name">Name</label>
            <input id="pf-name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="pf-description">Description</label>
            <textarea id="pf-description" name="description" value={form.description} onChange={handleChange} rows={3} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pf-price">Price ($)</label>
              <input id="pf-price" name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="pf-category">Category</label>
              <input id="pf-category" name="category" value={form.category} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-check">
            <input id="pf-published" name="published" type="checkbox" checked={form.published} onChange={handleChange} />
            <label htmlFor="pf-published">Published</label>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
