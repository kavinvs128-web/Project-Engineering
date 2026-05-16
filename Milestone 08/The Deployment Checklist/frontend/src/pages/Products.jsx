import React, { useEffect, useState } from 'react';

const Products = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock: 0 });
  const [message, setMessage] = useState({ text: '', type: '' });

  const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Check CORS and API base URL configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    try {
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setMessage({ text: 'Product created successfully!', type: 'success' });
        setNewProduct({ name: '', description: '', price: 0, stock: 0 });
        fetchProducts();
      } else {
        const errorData = await response.json();
        setMessage({ text: errorData.message || 'Access denied', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Auth flow error — check your token and backend logs', type: 'error' });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.025em' }}>Inventory Operations</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>View and manage LaunchPad mission assets</p>
        </div>
      </header>

      {user?.role === 'admin' && (
        <section style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 800 }}>+</span> Create New Asset
          </h3>
          <div className="card" style={{ maxWidth: '800px', border: '1px solid #334155', background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(8px)' }}>
            {message.text && (
              <p className={message.type === 'success' ? 'success-msg' : 'error-msg'} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                {message.text}
              </p>
            )}
            <form onSubmit={handleCreateProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Asset Name</label>
                <input
                  placeholder="e.g. Propulsion Module"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>
              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Price (kCR)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Initial Stock</label>
                <input
                  type="number"
                  placeholder="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Asset Description</label>
                <input
                  placeholder="Specifications and flight certifications..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" style={{ width: '100%', padding: '1rem', alignSelf: 'flex-end', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                  Acknowledge and Store Asset
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      <section>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Currently Indexed Assets</h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Synchronizing with mission manifest...</p>
          </div>
        ) : error ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
            <p className="error-msg" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{error}</p>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>The system is unable to establish a secure link with the LaunchPad API.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>Verify Item 05 (CORS) and Item 06 (API Base URL) in your deployment.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {products.map((p) => (
              <div key={p.id} className="card" style={{ transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Asset ID: {p.id.toString().padStart(4, '0')}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>{p.stock} units in bay</span>
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{p.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{p.description || 'No detailed specifications provided for this mission asset.'}</p>
                <div style={{ paddingTop: '1rem', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{p.price.toFixed(2)} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.2rem' }}>kCR</span></span>
                  <button style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>View Spec</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Products;
