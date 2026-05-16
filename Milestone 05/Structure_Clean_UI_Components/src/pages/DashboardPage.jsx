// DashboardPage.jsx
// TODO: This file is getting really long... but it works so let's not touch it 🙃

import { useState } from "react";
import tasks from "../data/tasks";

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
    setTaskList(
      taskList.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((t) => t.id !== id));
  };

  const filtered = taskList
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const completedCount = taskList.filter((t) => t.completed).length;
  const totalCount = taskList.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", color: "#e2e8f0", fontFamily: "sans-serif" }}>

      {/* ===== HEADER ===== */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #2d2d44" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
          <span style={{ fontSize: 22, fontWeight: 700, background: "linear-gradient(135deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FocusForge</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: 14, color: "#94a3b8" }}>Good morning 👋</span>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>JD</div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* ===== STATS CARDS ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          <div style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Total Tasks</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#e2e8f0" }}>{totalCount}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>All time</div>
          </div>
          <div style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Completed</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#22c55e" }}>{completedCount}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Done ✓</div>
          </div>
          <div style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Remaining</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#f59e0b" }}>{totalCount - completedCount}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>To do</div>
          </div>
          <div style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Progress</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#6366f1" }}>{progressPercent}%</div>
            <div style={{ height: 4, background: "#2d2d44", borderRadius: 99, marginTop: 8 }}>
              <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg,#6366f1,#8b5cf6)", borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
          </div>
        </div>

        {/* ===== ADD TASK INPUT ===== */}
        <div style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", marginBottom: 12 }}>Add New Task</div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="What needs to get done today?"
              style={{ flex: 1, background: "#0f0f1a", border: "1px solid #2d2d44", borderRadius: 10, padding: "10px 16px", color: "#e2e8f0", fontSize: 14, outline: "none" }}
            />
            <button
              onClick={addTask}
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 10, padding: "10px 20px", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* ===== FILTER + SEARCH ===== */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ padding: "6px 16px", borderRadius: 8, border: "1px solid", borderColor: filter === f ? "#6366f1" : "#2d2d44", background: filter === f ? "rgba(99,102,241,0.15)" : "transparent", color: filter === f ? "#a78bfa" : "#64748b", fontSize: 13, fontWeight: 500, cursor: "pointer", textTransform: "capitalize" }}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 10, padding: "8px 14px", color: "#e2e8f0", fontSize: 13, outline: "none", width: 200 }}
          />
        </div>

        {/* ===== TASK LIST ===== */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#475569" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>No tasks found</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Add a task above to get started</div>
            </div>
          )}
          {filtered.map((task) => (
            <div
              key={task.id}
              style={{ background: "#1a1a2e", border: `1px solid ${task.completed ? "#1e3a2e" : "#2d2d44"}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, transition: "border-color 0.2s", opacity: task.completed ? 0.6 : 1 }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${task.completed ? "#22c55e" : "#4b5563"}`, background: task.completed ? "#22c55e" : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12 }}
              >
                {task.completed ? "✓" : ""}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: task.completed ? "#64748b" : "#e2e8f0", textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: task.priority === "high" ? "rgba(239,68,68,0.15)" : task.priority === "medium" ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.15)", color: task.priority === "high" ? "#f87171" : task.priority === "medium" ? "#fbbf24" : "#4ade80" }}>
                    {task.priority}
                  </span>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "rgba(99,102,241,0.12)", color: "#a78bfa" }}>{task.tag}</span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                style={{ background: "transparent", border: "none", color: "#475569", cursor: "pointer", fontSize: 16, padding: "4px 8px", borderRadius: 6 }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
