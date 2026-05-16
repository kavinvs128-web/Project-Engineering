const TaskItem = ({ task, onToggleStatus, onDelete }) => {
  return (
    <div className="task-item">
      <div>
        <h4 style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
          {task.title}
        </h4>
        <p>{task.description}</p>
        <small>Status: {task.status}</small>
      </div>
      <div className="task-actions">
        {/* BUG: onClick={() => onToggleStatus} is missing the execution call, so it does nothing! */}
        <button className="btn" onClick={() => onToggleStatus}>
          {task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
        </button>
        
        {/* BUG: Passes the event object instead of the task ID! */}
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
