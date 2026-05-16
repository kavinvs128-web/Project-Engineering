// src/routes/health.js
// Health check endpoint for deployment monitoring

const express = require("express");

const router = express.Router();

// GET /api/health — Returns server status
// NOTE: This endpoint works even with the CORS bug because
// direct browser navigation / curl don't trigger CORS.
// Only cross-origin fetch/XHR from the frontend triggers it.
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

module.exports = router;
