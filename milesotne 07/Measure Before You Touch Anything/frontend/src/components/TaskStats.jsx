import { useState, useEffect } from 'react';

const TaskStats = ({ refreshTrigger }) => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  // BUG: useEffect dependency mistake causing extra re-renders
  // By omitting the dependency array, this runs on EVERY render!
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => {
        // Assume data.tasks exists (backend sends success: true, count, tasks)
        const tasks = data.tasks || [];
        setStats({
          total: tasks.length,
          completed: tasks.filter(t => t.status === 'completed').length,
          pending: tasks.filter(t => t.status === 'pending').length
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stats");
        setLoading(false);
      });
  }); // <-- Missing array here causes infinite loop if parent rerenders or state changes

  if (loading) return <div>Loading Stats...</div>;

  return (
    <div className="stats-grid">
      <div className="stat-box">
        <h3>Total Tasks</h3>
        <h2>{stats.total}</h2>
      </div>
      <div className="stat-box">
        <h3>Completed</h3>
        <h2>{stats.completed}</h2>
      </div>
      <div className="stat-box">
        <h3>Pending</h3>
        <h2>{stats.pending}</h2>
      </div>
    </div>
  );
};

export default TaskStats;
