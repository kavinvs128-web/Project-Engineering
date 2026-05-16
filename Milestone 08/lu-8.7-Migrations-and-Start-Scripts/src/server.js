// src/server.js
// DevLog API — Express Server Entry Point
//
// NOTE: The actual entry file is server.js — but the start script
// in package.json incorrectly points to app.js (Bug #2).
// The dev script correctly uses server.js, which is why it works locally.

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const logRoutes = require("./routes/logs");
const healthRoutes = require("./routes/health");

// Validate required env vars at startup
function validateEnv() {
  const required = ["DATABASE_URL", "JWT_SECRET"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `❌ FATAL: Missing required environment variables: ${missing.join(", ")}`
    );
    process.exit(1);
  }
  console.log("✅ All required environment variables are set.");
}

validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    name: "DevLog API",
    version: "1.0.0",
    docs: "/api/health",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 DevLog API running on port ${PORT}`);
});
