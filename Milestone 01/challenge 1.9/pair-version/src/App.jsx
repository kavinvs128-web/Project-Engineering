import { useState, useMemo } from "react";
import { Plus, Trash2, Circle, CheckCircle2 } from "lucide-react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: inputValue.trim(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setInputValue("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const stats = {
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Task Manager</h1>

      <form onSubmit={addTask}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add task..."
        />
        <button type="submit">
          <Plus size={16} />
        </button>
      </form>

      <div style={{ margin: "10px 0" }}>
        {["all", "active", "completed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <p>
        {stats.active} Active | {stats.completed} Completed
      </p>

      {filteredTasks.map((task) => (
        <div key={task.id} style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <button onClick={() => toggleTask(task.id)}>
            {task.completed ? <CheckCircle2 /> : <Circle />}
          </button>

          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>

          <button onClick={() => deleteTask(task.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}