// src/routes/notes.js

const express = require('express');
const router  = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/notes
// Creates a new note
// ❌ FLAW: No validation — empty title is accepted and stored.
//    Fix required: check that title exists and is not an empty string.
//    If invalid, return 422 Unprocessable Entity.
router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Missing validation here — title can be empty, null, or undefined
    // and the endpoint will still attempt to create a note.

    const note = await prisma.note.create({
      data: { title, content }
    });

    res.status(201).json({ note });
  } catch (err) {
    next(err);
  }
});

// GET /api/notes/:id
// Returns a single note by ID
// ❌ FLAW: Returns wrong response shape on 404.
//    Returns { error: 'Not found' } but tests expect { message: 'Note not found' }.
//    Fix required: change response body to match the expected contract.
router.get('/:id', async (req, res, next) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!note) {
      // ❌ Wrong key — 'error' should be 'message'
      return res.status(404).json({ error: 'Not found' });
    }

    res.status(200).json({ note });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
