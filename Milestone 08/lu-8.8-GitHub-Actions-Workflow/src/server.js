// src/server.js
// TaskPulse API — minimal Express server for CI/CD workflow challenge

const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);

app.get("/", (req, res) => {
  res.json({
    name: "TaskPulse API",
    version: "1.0.0",
  });
});

// Only start listening if this file is run directly (not imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 TaskPulse API running on port ${PORT}`);
  });
}

module.exports = app;
