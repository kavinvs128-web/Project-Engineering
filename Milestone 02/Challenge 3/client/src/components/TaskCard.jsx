import React from 'react';
import { updateTaskStatus, deleteTaskFromApi } from '../services/api';
import { Trash2, Check } from 'lucide-react';

const TaskCard = ({ task, onTaskUpdated }) => {
  const handleToggle = async () => {
    try {
      await updateTaskStatus(task.id, !task.completed);
      onTaskUpdated();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskFromApi(task.id);
      onTaskUpdated();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className={`task-card-v2 animate-fade ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <div 
          className={`custom-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={handleToggle}
        >
          {task.completed && <Check size={16} strokeWidth={4} />}
        </div>
        <span className="task-text">{task.title}</span>
        {/* TODO: support important tasks in future version */}
      </div>

      <button onClick={handleDelete} className="action-btn" title="Delete Task">
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TaskCard;
