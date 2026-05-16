import { useState } from "react";
import tasks from "../data/tasks";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsRow from "../components/dashboard/StatsRow";
import AddTaskInput from "../components/dashboard/AddTaskInput";
import TaskFilterBar from "../components/dashboard/TaskFilterBar";
import TaskList from "../components/dashboard/TaskList";

export default function DashboardPage() {
  const [taskList, setTaskList] = useState(tasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    setTaskList([
      ...taskList,
      {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority: "medium",
        tag: "general",
        createdAt: new Date().toISOString(),
      },
    ]);

    setNewTask("");
  };

  const toggleTask = (id) => {
    setTaskList(taskList.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const filteredTasks = taskList
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const completedCount = taskList.filter((task) => task.completed).length;
  const totalCount = taskList.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const stats = [
    { label: "Total Tasks", value: totalCount, footerText: "All time" },
    { label: "Completed", value: completedCount, valueColor: "#22c55e", footerText: "Done ✓" },
    { label: "Remaining", value: totalCount - completedCount, valueColor: "#f59e0b", footerText: "To do" },
    { label: "Progress", value: `${progressPercent}%`, valueColor: "#6366f1", progress: progressPercent },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", color: "#e2e8f0", fontFamily: "sans-serif" }}>
      <DashboardHeader />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        <StatsRow stats={stats} />
        <AddTaskInput taskInput={newTask} setTaskInput={setNewTask} onAddTask={addTask} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
          <TaskFilterBar filter={filter} setFilter={setFilter} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 10, padding: "8px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", width: 200 }}
          />
        </div>

        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </div>
  );
}
