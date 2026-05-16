import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * ProductActions — THE KEY COMPONENT
 *
 * Admin-only actions hidden for non-admin users.
 *
 * The UI correctly hides Delete and Publish buttons when the logged-in
 * user's role is NOT "admin". However, the backend does NOT enforce this
 * restriction — any authenticated user can call DELETE /api/products/:id
 * directly and receive an HTTP 200 response.
 */
export default function ProductActions({ product, token, onDeleted, onEdit, onPublishToggled }) {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);

  // ── Admin-only actions hidden for non-admin users ─────────────────────────
  if (user?.role !== 'admin') {
    // Customers see no action buttons at all
    return null;
  }
  // ──────────────────────────────────────────────────────────────────────────

  async function handleDelete() {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      onDeleted();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handlePublishToggle() {
    setBusy(true);
    try {
      const res = await fetch(`/api/products/${product.id}/publish`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Publish toggle failed');
      onPublishToggled();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="product-actions">
      <button
        id={`btn-edit-${product.id}`}
        className="btn btn-ghost btn-sm"
        disabled={busy}
        onClick={onEdit}
      >
        Edit
      </button>

      <button
        id={`btn-publish-${product.id}`}
        className={`btn btn-sm ${product.published ? 'btn-warning' : 'btn-success'}`}
        disabled={busy}
        onClick={handlePublishToggle}
      >
        {product.published ? 'Unpublish' : 'Publish'}
      </button>

      <button
        id={`btn-delete-${product.id}`}
        className="btn btn-danger btn-sm"
        disabled={busy}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
