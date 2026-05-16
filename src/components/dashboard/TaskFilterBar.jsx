export default function TaskFilterBar({ filter, setFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          style={{
            padding: "6px 16px",
            borderRadius: 8,
            border: "1px solid",
            borderColor: filter === item ? "#6366f1" : "#2d2d44",
            background: filter === item ? "rgba(99,102,241,0.15)" : "transparent",
            color: filter === item ? "#a78bfa" : "#64748b",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
