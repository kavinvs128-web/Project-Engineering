import StatCard from "../shared/StatCard";

export default function StatsRow({ stats }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} valueColor={stat.valueColor}>
          {stat.footerText && (
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{stat.footerText}</div>
          )}
          {typeof stat.progress === "number" && (
            <div style={{ height: 4, background: "#2d2d44", borderRadius: 99, marginTop: 8 }}>
              <div
                style={{
                  height: "100%",
                  width: `${stat.progress}%`,
                  background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          )}
        </StatCard>
      ))}
    </div>
  );
}
