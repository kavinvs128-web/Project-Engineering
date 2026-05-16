import React from 'react';

const IssueCard = ({ issue, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'status-red';
      case 'IN_PROGRESS': return 'status-yellow';
      case 'RESOLVED': return 'status-green';
      default: return 'status-gray';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{issue.title}</h3>
        <span className={`badge ${getStatusColor(issue.status)}`}>{issue.status}</span>
      </div>
      <p className="card-description">{issue.description}</p>
      <div className="card-footer">
        <select 
          value={issue.status} 
          onChange={(e) => onUpdateStatus(issue.id, e.target.value)}
          className="status-select"
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>
    </div>
  );
};

export default IssueCard;
