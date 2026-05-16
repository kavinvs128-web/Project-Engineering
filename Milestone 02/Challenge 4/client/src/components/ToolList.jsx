import React from 'react';
import ToolCard from './ToolCard';

const ToolList = ({ tools, onUpdateTool }) => {
  return (
    <div className="tool-list-container">
      <div className="list-header">
        <h2>🛠 Community Tools</h2>
      </div>

      <div className="tool-grid">
        {tools.length === 0 ? (
          <p className="empty-msg">No tools listed yet. Be the first!</p>
        ) : (
          /* BUG 3: tool.index is undefined — should be tool.id */
          tools.map(tool => (
            <ToolCard key={tool.index} tool={tool} onUpdate={onUpdateTool} />
          ))
        )}
      </div>
    </div>
  );
};

export default ToolList;
