import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import ScoreWidget from '../components/ScoreWidget';
import { ListTodo, Search, Filter } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <header className="welcome-section animate-fade">
        <h1>Dashboard</h1>
        <p>Welcome back! You have {tasks.filter(t => !t.completed).length} active tasks for today.</p>
      </header>

      <ScoreWidget tasks={tasks} />

      <div className="dashboard-grid">
        <div className="main-content">
          <div className="section-title">
            <h3><ListTodo size={22} color="var(--primary)" /> Tasks</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="action-btn"><Search size={18} /></div>
              <div className="action-btn"><Filter size={18} /></div>
            </div>
          </div>
          
          {loading ? (
            <div className="animate-fade" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              Gathering your activities...
            </div>
          ) : (
            <div className="task-list">
              {tasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px dashed #cbd5e1' }}>
                  <img src="https://illustrations.popsy.co/gray/success.svg" alt="Empty" style={{ width: '120px', marginBottom: '1.5rem', opacity: 0.5 }} />
                  <p className="text-muted">No tasks found. Your day is looking clear!</p>
                </div>
              ) : (
                tasks.map(task => (
                  <TaskCard key={task.id} task={task} onTaskUpdated={getTasks} />
                ))
              )}
            </div>
          )}
        </div>

        <div className="sidebar-aside">
          <TaskForm onTaskCreated={getTasks} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
