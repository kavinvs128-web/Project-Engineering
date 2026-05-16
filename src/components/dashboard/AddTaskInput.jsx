export default function AddTaskInput({ taskInput, setTaskInput, onAddTask }) {
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", marginBottom: 12 }}>Add New Task</div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAddTask()}
          placeholder="What needs to get done today?"
          style={{
            flex: 1,
            background: "#0f0f1a",
            border: "1px solid #2d2d44",
            borderRadius: 10,
            padding: "10px 16px",
            color: "#e2e8f0",
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          onClick={onAddTask}
          style={{
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none",
            borderRadius: 10,
            padding: "10px 20px",
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
