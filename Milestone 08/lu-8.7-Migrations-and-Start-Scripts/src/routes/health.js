// src/routes/health.js
// Health check endpoint for deployment monitoring

const express = require("express");

const router = express.Router();

// GET /api/health — Returns server status
// NOTE: This endpoint does NOT touch the database,
// so it will pass even when migrations haven't been run.
// The crash only happens on the first DB query.
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
