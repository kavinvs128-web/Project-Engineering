import { useState } from "react";
import { createTask } from "../api/taskApi";

export default function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const newTask = await createTask(title);
      onTaskAdded(newTask);
      setTitle("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
