// src/routes/notes.js
// CRUD routes for notes (protected — requires authentication)

const express = require("express");
const prisma = require("../config/db");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// All note routes require authentication
router.use(authenticate);

// POST /api/notes — Create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.userId,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/notes — Get all notes for the logged-in user
router.get("/", async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(notes);
  } catch (error) {
    console.error("Fetch notes error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/notes/:id — Get a single note
router.get("/:id", async (req, res) => {
  try {
    const note = await prisma.note.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.json(note);
  } catch (error) {
    console.error("Fetch note error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/notes/:id — Update a note
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if note exists and belongs to user
    const existingNote = await prisma.note.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!existingNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    const updatedNote = await prisma.note.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    res.json(updatedNote);
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/notes/:id — Delete a note
router.delete("/:id", async (req, res) => {
  try {
    const existingNote = await prisma.note.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!existingNote) {
      return res.status(404).json({ error: "Note not found." });
    }

    await prisma.note.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
