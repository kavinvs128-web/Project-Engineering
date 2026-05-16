import React from 'react';

const TaskCard = ({ task, onUpdateStatus }) => {
  return (
    <div className="card task-card">
      <div className="card-header">
        <h3 className="card-title">{task.title}</h3>
        <span className={`badge ${task.status === 'COMPLETED' ? 'status-green' : 'status-blue'}`}>
          {task.status}
        </span>
      </div>
      <div className="card-details">
        <p><strong>Assigned to:</strong> {task.assignedTo}</p>
      </div>
      <div className="card-footer">
        <button 
          onClick={() => onUpdateStatus(task.id, task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED')}
          className="btn-link"
        >
          Mark as {task.status === 'COMPLETED' ? 'Pending' : 'Completed'}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
