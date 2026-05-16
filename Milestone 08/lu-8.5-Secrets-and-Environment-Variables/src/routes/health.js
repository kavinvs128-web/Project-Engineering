// src/routes/health.js
// Health check endpoint for deployment monitoring

const express = require("express");

const router = express.Router();

// GET /api/health — Returns server status
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
