import React, { useState, useEffect } from 'react';
import ToolList from './components/ToolList';
import AddToolForm from './components/AddToolForm';
import './App.css';

function App() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // MAJOR FRONTEND BUG 1: Infinite Loop / Component Re-mounting
  // We are missing the dependency array [] in this useEffect.
  // This causes the component to fetch, set state, re-render, and fetch again indefinitely.
  useEffect(() => { 
    console.log("Fetching tools...");
    fetchTools(); 
  }); 

  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tools');
      const data = await response.json();
      setTools(data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToolAdded = () => {
    fetchTools();
  };

  const handleToolUpdate = (updatedTool) => {
    // MAJOR FRONTEND BUG 2: Direct State Mutation
    // Instead of setTools(tools.map(...)), we are modifying the state object directly.
    // This often causes the UI to not re-render because the state reference hasn't changed.
    const index = tools.findIndex(t => t.id === updatedTool.id);
    if (index !== -1) {
      tools[index] = updatedTool; 
      // Oops, forgot to call setTools with a new array reference!
      console.log("Tools mutated directly:", tools);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <span className="icon">🛠️</span>
          <h1>Community Tool Library</h1>
        </div>
        <p className="subtitle">Borrow what you need. Share what you own.</p>
      </header>

      <main className="app-content">
        <section>
          <AddToolForm onToolAdded={handleToolAdded} />
        </section>
        <section>
          {loading
            ? <div className="loader">Loading tools...</div>
            : <ToolList tools={tools} onUpdateTool={handleToolUpdate} />
          }
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 Community Tool Library</p>
      </footer>
    </div>
  );
}

export default App;
