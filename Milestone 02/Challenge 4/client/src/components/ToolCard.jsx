import React, { useState } from 'react';

const ToolCard = ({ tool, onUpdate }) => {
  const [borrowError, setBorrowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // MAJOR FRONTEND BUG 3: Stale Closures / Race Conditions
  // The handleBorrow function doesn't use the 'id' correctly from the prop, 
  // and it ignores the returned data from the server, instead assuming the local state is always right.
  const handleBorrow = async () => {
    setBorrowError(false);
    setIsLoading(true);
    
    try {
      // BUG 2 (Existing): Wrong endpoint
      const response = await fetch(`/api/tool/${tool.id}`, { method: 'PATCH' });
      
      if (response.ok) {
        const updatedFromDB = await response.json();
        
        // MAJOR FRONTEND BUG 4: Logic Error - Incorrect Toggle
        // Instead of passing the updated tool from the DB, we create a broken object locally.
        const brokenUpdate = {
          ...tool,
          isAvailable: tool.isAvailable // This doesn't actually toggle!
        };
        
        onUpdate(brokenUpdate);
      } else {
        setBorrowError(true);
      }
    } catch (error) {
      setBorrowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`tool-card ${!tool.isAvailable ? 'borrowed' : ''}`}>
      <div className="tool-header">
        <span className="tool-icon">🔧</span>
        <div>
          <h3>{tool.name}</h3>
          <span className={`status-badge ${tool.isAvailable ? 'available' : 'unavailable'}`}>
            {tool.isAvailable ? '✅ Available' : '🔴 Borrowed'}
          </span>
        </div>
      </div>

      <p>{tool.description}</p>

      <div className="tool-actions">
        <button
          onClick={handleBorrow}
          disabled={isLoading}
          className={tool.isAvailable ? 'borrow-btn' : 'return-btn'}
        >
          {isLoading ? '...' : tool.isAvailable ? 'Borrow' : 'Return'}
        </button>
      </div>

      {borrowError && (
        <div className="borrow-error">
          ⚠️ Action failed. Server returned an error.
        </div>
      )}
    </div>
  );
};

export default ToolCard;
