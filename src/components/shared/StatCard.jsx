export default function StatCard({ label, value, valueColor, children }) {
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid #2d2d44", borderRadius: 14, padding: "20px 24px" }}>
      <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: valueColor || "#e2e8f0" }}>{value}</div>
      {children}
    </div>
  );
}
