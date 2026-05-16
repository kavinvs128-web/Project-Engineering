// src/routes/bookmarks.js
// CRUD routes for bookmarks (protected — requires authentication)

const express = require("express");
const prisma = require("../config/db");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// All bookmark routes require authentication
router.use(authenticate);

// POST /api/bookmarks — Save a new bookmark
router.post("/", async (req, res) => {
  try {
    const { url, title, description } = req.body;

    if (!url || !title) {
      return res.status(400).json({ error: "URL and title are required." });
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        url,
        title,
        description: description || null,
        userId: req.userId,
      },
    });

    res.status(201).json(bookmark);
  } catch (error) {
    console.error("Create bookmark error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/bookmarks — Get all bookmarks for the logged-in user
router.get("/", async (req, res) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(bookmarks);
  } catch (error) {
    console.error("Fetch bookmarks error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/bookmarks/:id — Get a single bookmark
router.get("/:id", async (req, res) => {
  try {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark not found." });
    }

    res.json(bookmark);
  } catch (error) {
    console.error("Fetch bookmark error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/bookmarks/:id — Update a bookmark
router.put("/:id", async (req, res) => {
  try {
    const { url, title, description } = req.body;

    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!existingBookmark) {
      return res.status(404).json({ error: "Bookmark not found." });
    }

    const updatedBookmark = await prisma.bookmark.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(url && { url }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
      },
    });

    res.json(updatedBookmark);
  } catch (error) {
    console.error("Update bookmark error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/bookmarks/:id — Delete a bookmark
router.delete("/:id", async (req, res) => {
  try {
    const existingBookmark = await prisma.bookmark.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (!existingBookmark) {
      return res.status(404).json({ error: "Bookmark not found." });
    }

    await prisma.bookmark.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: "Bookmark deleted successfully." });
  } catch (error) {
    console.error("Delete bookmark error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
