import React from 'react';

const Cart = ({ items, onDelete }) => {
  return (
    <section className="panel">
      <h3 className="panel-title">Shared Cart</h3>
      <div className="item-list">
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>No items in the cart yet.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="item-card" style={{ height: '60px', overflow: 'hidden' }}>
              <div className="item-info" style={{ whiteSpace: 'nowrap' }}>
                {/* VISIBLE BUG: Long names will be cut off or overlap because of fixed height/nowrap */}
                <h4>{item.name || "Unnamed Item"}</h4>
                <span>Added by {item.addedBy}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="item-price" style={{ color: item.price < 0 ? '#ef4444' : '#4f46e5' }}>
                  ${parseFloat(item.price || 0).toFixed(2)}
                </span>
                <button 
                  className="delete-btn" 
                  onClick={() => onDelete(item.id)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Cart;
