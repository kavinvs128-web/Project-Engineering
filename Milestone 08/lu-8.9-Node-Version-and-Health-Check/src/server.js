// src/server.js
// WeatherDash API — Express Server Entry Point

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weather");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);

// ============================================================
// BUG #4 (partial): Missing Health Check Endpoint
//
// Render's new deployment system expects a service to return
// a 200 OK from a health check path (like `/health`).
//
// The developer forgot to add the `app.get("/health", ...)` route entirely.
// When Render queries whatever healthCheckPath is configured,
// it will get a 404, and eventually mark the deployment as FAILED
// because it "never became healthy".
// ============================================================

app.get("/", (req, res) => {
  res.json({
    name: "WeatherDash API",
    version: "1.0.0",
    docs: "/api/weather/forecast",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

// Start the server (but only if run directly, not when required by Jest tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌤️  WeatherDash API running on port ${PORT}`);
  });
}

// Export for tests
module.exports = app;
