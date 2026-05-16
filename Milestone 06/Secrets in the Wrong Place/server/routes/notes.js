const express = require('express');
const router = express.Router();
const { createNote, getNotesByGroup, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createNote);
router.get('/:groupId', authMiddleware, getNotesByGroup);
router.post('/:id/delete', authMiddleware, deleteNote); // Use POST for deletion with password payload

module.exports = router;
