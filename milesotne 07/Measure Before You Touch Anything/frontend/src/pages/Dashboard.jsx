import TaskStats from '../components/TaskStats';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <div style={{ flex: 1 }}>
        <h1>Dashboard</h1>
        <p className="subtitle">Welcome to your productivity center. See your overview below.</p>
        
        {/* TaskStats has an intentional infinite re-render loop inside */}
        <TaskStats />
      </div>
    </div>
  );
};

export default Dashboard;
