import { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import MotivationWidget from "../components/MotivationWidget";
import { getTasks } from "../api/taskApi";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="dashboard">
      <header>
        <h1>FocusForge</h1>
        <p>Stay focused, stay productive.</p>
      </header>

      <div className="main-content">
        <div className="task-section">
          <h2>Task Manager</h2>
          <AddTask onTaskAdded={handleTaskAdded} />
          <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} />
        </div>

        <aside className="sidebar">
          <MotivationWidget />
        </aside>
      </div>
    </div>
  );
}
