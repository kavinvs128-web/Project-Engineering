// src/routes/weather.js
// Mock weather endpoints for the WeatherDash API

const express = require("express");
const router = express.Router();

// Mock data (imagine this comes from an external weather service)
const mockForecast = [
  { day: "Monday", tempC: 22, condition: "Sunny" },
  { day: "Tuesday", tempC: 18, condition: "Partly Cloudy" },
  { day: "Wednesday", tempC: 15, condition: "Rain" },
  { day: "Thursday", tempC: 25, condition: "Clear" },
  { day: "Friday", tempC: 20, condition: "Windy" }
];

// GET /api/weather/forecast?sort=temp
router.get("/forecast", (req, res) => {
  try {
    const { sort } = req.query;

    if (sort === "temp") {
      // ============================================================
      // Node 20+ Feature: Array.prototype.toSorted()
      //
      // `.toSorted()` creates a NEW sorted array without mutating
      // the original array. It's much safer than the old `.sort()`.
      //
      // However, it was only introduced in Node.js v20.0.0.
      // If deployed in a Node 18 environment, this line CRASHES with:
      // "TypeError: mockForecast.toSorted is not a function"
      // ============================================================
      const sortedForecast = mockForecast.toSorted((a, b) => b.tempC - a.tempC);
      return res.json(sortedForecast);
    }

    // Default: unsorted
    res.json(mockForecast);
  } catch (error) {
    console.error("Error processing forecast:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
