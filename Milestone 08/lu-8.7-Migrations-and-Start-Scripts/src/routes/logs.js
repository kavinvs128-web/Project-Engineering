// src/routes/logs.js
// CRUD routes for developer journal log entries (protected)

const express = require("express");
const prisma = require("../config/db");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.use(authenticate);

// POST /api/logs — Create a new log entry
router.post("/", async (req, res) => {
  try {
    const { title, content, tags, mood } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    const logEntry = await prisma.logEntry.create({
      data: {
        title,
        content,
        tags: tags || "",
        mood: mood || "neutral",
        userId: req.userId,
      },
    });

    res.status(201).json(logEntry);
  } catch (error) {
    console.error("Create log error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/logs — Get all log entries for the logged-in user
router.get("/", async (req, res) => {
  try {
    const logs = await prisma.logEntry.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(logs);
  } catch (error) {
    console.error("Fetch logs error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/logs/:id — Get a single log entry
router.get("/:id", async (req, res) => {
  try {
    const logEntry = await prisma.logEntry.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!logEntry) {
      return res.status(404).json({ error: "Log entry not found." });
    }

    res.json(logEntry);
  } catch (error) {
    console.error("Fetch log error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/logs/:id — Update a log entry
router.put("/:id", async (req, res) => {
  try {
    const { title, content, tags, mood } = req.body;

    const existingLog = await prisma.logEntry.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!existingLog) {
      return res.status(404).json({ error: "Log entry not found." });
    }

    const updatedLog = await prisma.logEntry.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(tags !== undefined && { tags }),
        ...(mood && { mood }),
      },
    });

    res.json(updatedLog);
  } catch (error) {
    console.error("Update log error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/logs/:id — Delete a log entry
router.delete("/:id", async (req, res) => {
  try {
    const existingLog = await prisma.logEntry.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!existingLog) {
      return res.status(404).json({ error: "Log entry not found." });
    }

    await prisma.logEntry.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: "Log entry deleted successfully." });
  } catch (error) {
    console.error("Delete log error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
