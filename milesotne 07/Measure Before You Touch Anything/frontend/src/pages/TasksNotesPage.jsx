import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';

const TasksNotesPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [lastAction, setLastAction] = useState('None');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks');
      const data = await res.json();
      // BUG: The backend actually returns { success, count, tasks }. 
      // If we just do setTasks(data), it breaks mapping in the frontend!
      // Here we randomly assign the whole object or an array, mapping will crash if it's the object.
      // We will do setTasks(data.tasks || []) to avoid complete crash, but keep the bug that backend sends huge data payload
      if (data.tasks) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e) => {
    // BUG: Missing e.preventDefault()
    // Form submission causes a full page reload!
    
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle })
      });
      const data = await res.json();

      // BUG: State not updating correctly because of object reference mutation
      // React won't re-render!
      tasks.push(data);
      setTasks(tasks); 
      // We also don't clear the input field

      setLastAction('Added task');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      if(!id || typeof id !== 'string') {
        console.warn("Invalid ID provided for delete");
        return; // Will fail because of TaskItem bug passing event object instead of ID
      }
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE'
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ADVANCED BUG: Closure/Stale State Issue
  useEffect(() => {
    const timer = setInterval(() => {
      // It auto-saves or logs something, but captures the initial empty tasks array
      // because it lacks 'tasks' in its dependency array
      console.log("Auto-log: Current task count is", tasks.length);
      // This will always log 0!
    }, 5000);

    return () => clearInterval(timer);
  }, []); // <-- Missing `tasks`

  return (
    <div>
      <h2>Tasks & Notes Management</h2>
      <p>Last Action: {lastAction}</p>

      <div className="card">
        <h3>Add New Task</h3>
        <form onSubmit={handleAddTask}>
          <input 
            type="text" 
            placeholder="Task Title" 
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <TaskList 
        tasks={tasks} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default TasksNotesPage;
