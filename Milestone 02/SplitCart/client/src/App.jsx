import React, { useState, useEffect } from 'react';
import { fetchCart, addItem, deleteItem, confirmPayment } from './api';
import Cart from './Cart';
import AddItem from './AddItem';
import PaymentPanel from './PaymentPanel';

function App() {
  const [cart, setCart] = useState({ items: [], participants: [], payments: [], total: 0, share: 0 });
  const [status, setStatus] = useState(null);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setCart(data);
    } catch (err) {
      console.error("FAILED TO SYNC WITH MAINRANE", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleAddItem = async (item) => {
    // VISIBLE BUG: GHOST DUPLICATION preserved
    const tempItem = { ...item, id: 'temp-' + Date.now(), addedBy: item.addedBy };
    setCart(prev => ({
      ...prev,
      items: [...prev.items, tempItem, { ...tempItem, id: tempItem.id + '-copy' }]
    }));

    await addItem(item);
    setTimeout(loadCart, 2500); 
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    loadCart();
  };

  const handlePay = async (participant, amount) => {
    const result = await confirmPayment({ participant, amount });
    setStatus(result);
    loadCart();
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>SPLITCART</h1>
        <p>[ PROTOCOL: EXPENSE_SETTLEMENT_v1.0.0 ]</p>
      </header>
      
      <div style={{ background: 'rgba(255, 171, 0, 0.1)', border: '1px solid #ffab00', padding: '0.75rem', marginBottom: '2rem', fontSize: '0.85rem', color: '#ffab00', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>[!] WARNING:</span> UNSTABLE BUILD DETECTED. SYSTEM LOGIC MAY BE COMPROMISED.
      </div>

      <div className="grid">
        <div className="main-content">
          <Cart items={cart.items} onDelete={handleDeleteItem} />
          <div style={{ marginTop: '2.5rem' }}>
            <AddItem onAdd={handleAddItem} participants={cart.participants} />
          </div>
        </div>

        <aside className="sidebar">
          <PaymentPanel 
            participants={cart.participants} 
            payments={cart.payments}
            total={cart.total}
            share={cart.share}
            onPay={handlePay}
            status={status}
          />
        </aside>
      </div>
      
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: '#008f11', fontSize: '0.7rem', opacity: 0.6 }}>
        &copy; 2026 NEBULA-SYSTEMS | ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}

export default App;
