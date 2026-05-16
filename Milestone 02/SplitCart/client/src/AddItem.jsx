import React, { useState } from 'react';

const AddItem = ({ onAdd, participants }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [addedBy, setAddedBy] = useState(participants[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // VISIBLE BUG: No validation on name or price is preserved
    onAdd({ name, price, addedBy });
    setName('');
    setPrice('');
  };

  return (
    <section className="panel">
      <h3 className="panel-title">
        <span style={{color: '#008f11'}}>&gt;</span> INJECT_EXPENSE
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>RESOURCE_NAME</label>
          <input 
            type="text" 
            placeholder="[ ENTRY REQUIRED ]" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>CREDIT_VALUE ($)</label>
          <input 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>ORIGIN_NODE</label>
          <select 
            value={addedBy}
            onChange={(e) => setAddedBy(e.target.value)}
          >
            {participants.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <button type="submit" className="btn-primary">COMMIT TO SHARED_POOL</button>
      </form>
    </section>
  );
};

export default AddItem;
