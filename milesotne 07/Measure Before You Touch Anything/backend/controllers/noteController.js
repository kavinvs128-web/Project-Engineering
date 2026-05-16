const Note = require('../models/Note');

// @desc    Get notes for a task
// @route   GET /api/notes/:taskId
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ taskId: req.params.taskId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a note
// @route   POST /api/notes
const createNote = async (req, res) => {
  try {
    const { taskId, content } = req.body;
    
    // BUG: missing await!
    const note = Note.create({
      taskId,
      content
    });

    // BUG: Returns the Mongoose Promise object instead of the actual document!
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  createNote
};
