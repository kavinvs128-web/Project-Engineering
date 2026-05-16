import React, { useState, useEffect } from 'react';
import { getMetrics } from '../services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalPosts: 0,
    totalIssues: 0,
    tasksCompleted: 0,
    activityScore: 0
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div>
      <div className="hero-section" style={{marginBottom: '3rem'}}>
        <h1 className="page-title" style={{marginBottom: '0.5rem'}}>Welcome to LocalConnect</h1>
        <p className="card-description" style={{fontSize: '1.2rem'}}>Your neighborhood's digital hub for staying connected and productive.</p>
      </div>
      
      <div className="card">
        <h2 className="card-title" style={{marginBottom: '1.5rem'}}>Community Activity Overview</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-value">{metrics.totalPosts}</span>
            <span className="metric-label">Total Posts</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{metrics.totalIssues}</span>
            <span className="metric-label">Issues Reported</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{metrics.tasksCompleted}</span>
            <span className="metric-label">Tasks Completed</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{metrics.activityScore}</span>
            <span className="metric-label">Activity Score</span>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="card-title">Project Status</h2>
        <p className="card-description">This dashboard provides a high-level overview of our community productivity and engagement metrics.</p>
      </div>
    </div>
  );
};

export default Dashboard;
