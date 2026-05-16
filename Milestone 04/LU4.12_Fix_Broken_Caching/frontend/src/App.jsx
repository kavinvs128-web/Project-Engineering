import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Tag, Loader2, Sparkles } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/tasks');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, price })
      });
      
      if (response.ok) {
        setTitle('');
        setDescription('');
        setPrice('');
        await fetchTasks();
      }
    } catch (err) {
      console.error('Error creating:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
      });
      if (response.ok || response.status === 204) {
        await fetchTasks();
      }
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1><Sparkles size={32} style={{marginRight: '12px', verticalAlign: 'middle'}} />SideHustle Central</h1>
        <p>The premium portal for student opportunities and rapid tasks.</p>
      </header>

      <section className="form-card">
        <h2 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Plus size={24} /> Create New Opportunity
        </h2>
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label>Task Title</label>
            <input 
              placeholder="e.g. Design a logo for a startup" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Detailed Description</label>
            <textarea 
              placeholder="Share the requirements, scope, and any deadlines..." 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required 
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>Reward Amount ($)</label>
            <input 
              placeholder="0.00" 
              type="number" 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" style={{margin: '0 auto'}} /> : 'Post Opportunity'}
          </button>
        </form>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Available Markets</h2>
        {isLoading && <Loader2 className="animate-spin" size={24} color="#8b5cf6" />}
      </div>

      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-footer">
              <span className="price-tag">
                <Tag size={14} style={{ marginRight: '6px' }} />
                ${task.price}
              </span>
              <button 
                onClick={() => handleDelete(task.id)} 
                className="delete-btn"
                title="Remove task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {!isLoading && tasks.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <p>No opportunities found. Be the first to post!</p>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default App;
