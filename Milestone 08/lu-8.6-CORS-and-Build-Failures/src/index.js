// src/index.js
// LinkShelf API — Express Server Entry Point

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const bookmarkRoutes = require("./routes/bookmarks");
const healthRoutes = require("./routes/health");

// ============================================================
// Validate required env vars at startup
// (Lesson from 8.5 — always validate before booting)
// ============================================================
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

// ============================================================
// BUG #1: CORS is configured with a wildcard origin ("*").
//
// This SEEMS like it should allow everything, but it actually
// BREAKS when the frontend sends credentials (cookies, auth
// headers). Browsers reject wildcard origins for credentialed
// requests, returning:
//   "CORS policy: No 'Access-Control-Allow-Origin' header"
//
// The fix: use process.env.CORS_ORIGIN to allow only the
// specific deployed frontend URL.
// ============================================================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    name: "LinkShelf API",
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
  console.log(`🚀 LinkShelf API running on port ${PORT}`);
});
