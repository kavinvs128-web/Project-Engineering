import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleStatus, onDelete }) => {
  
  // PERFORMANCE BUG: Extremely heavy and totally unnecessary synchronous calculation
  // This blocks the main thread on every render
  const simulateHeavyLoad = () => {
    let result = 0;
    for (let i = 0; i < 20000000; i++) {
        result += Math.sqrt(i);
    }
    return result;
  };
  
  // Call it on every render without useMemo
  simulateHeavyLoad();

  return (
    <div className="card">
      <h3>Your Tasks</h3>
      
      {/* BUG: Incorrect conditional rendering! 
          If tasks.length is 0, this renders a literal "0" on the screen */}
      {tasks.length && (
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onToggleStatus={onToggleStatus} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
      
      {tasks.length === 0 && <p>No tasks available.</p>}
    </div>
  );
};

export default TaskList;
