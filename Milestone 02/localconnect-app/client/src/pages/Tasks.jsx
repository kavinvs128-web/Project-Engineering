import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { getTasks, createTask, updateTask } from '../services/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTask(title, assignedTo);
      setTitle('');
      setAssignedTo('');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateTask(id, status);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Neighborhood Tasks (Productivity)</h1>
      <div className="card">
        <h2 className="card-title" style={{marginBottom: '1rem'}}>Assign a Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{display: 'flex', gap: '0.5rem'}}>
            <input 
              className="input-field" 
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input 
              className="input-field" 
              placeholder="Assigned To"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">Add Task</button>
        </form>
      </div>
      <div className="grid">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onUpdateStatus={handleUpdateStatus} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
