// ─────────────────────────────────────────────────────
//  ShopWave — Product Search Page
//  src/pages/ProductSearch.jsx
//
//  ⚠️  THIS FILE CONTAINS 2 INTENTIONAL BUGS  ⚠️
//
//  Bug #1 — Infinite re-render loop
//  Bug #2 — Race condition / stale search results
//
//  Your job: find them, fix them, document them in BUG_REPORT.md
// ─────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { searchProducts } from '../api/shopwaveApi';

export default function ProductSearch() {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ─── BUG ZONE ───────────────────────────────────────
  //
  // Bug #1: Look closely at the dependency array below.
  //         Which value does NOT belong here, and why
  //         does including it cause an infinite loop?
  //
  // Bug #2: Open the Network tab in DevTools and type
  //         quickly. How many requests fire? What happens
  //         when a slow earlier request resolves after a
  //         fast later one? How can we prevent that?
  //
  // ────────────────────────────────────────────────────

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    searchProducts(query).then((data) => {
      setResults(data);    // ← ask yourself: does calling this affect the deps?
      setLoading(false);
    });

    // ❌ Bug #1: `results` is listed as a dependency.
    //    Every setResults() call changes `results`, which re-runs this effect,
    //    which calls setResults() again → infinite loop.
  }, [query, results]);    // 👈 something is wrong here

  // ❌ Bug #2: No debounce, no cleanup function.
  //    Every keystroke fires a new request immediately.
  //    A slower request for "head" can resolve after a
  //    faster one for "headphones", overwriting results
  //    with stale data.

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔍 Product Search</h1>
        <p className="subtitle">
          Search ShopWave's entire product catalogue in real time.
        </p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Try 'wireless', 'fitness', 'kitchen'…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" />
          <p>Searching products…</p>
        </div>
      )}

      {!loading && results.length === 0 && query.trim() !== '' && (
        <div className="empty-state">
          No products found for "{query}".
        </div>
      )}

      <div className="product-grid">
        {results.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-category">{product.category}</div>
            <h3 className="product-name">{product.name}</h3>
            <div className="product-meta">
              <span className="price">${product.price.toFixed(2)}</span>
              <span className="stock">{product.stock} in stock</span>
            </div>
            <div className="sales-badge">⬆ {product.sales} sold</div>
          </div>
        ))}
      </div>
    </div>
  );
}
