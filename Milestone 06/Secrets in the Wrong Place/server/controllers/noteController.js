const prisma = require('../lib/prisma');
const { ADMIN_PASSWORD } = require('../config/admin');

const createNote = async (req, res) => {
  const { title, content, fileUrl, groupId } = req.body;
  
  try {
    // Flaw 14: Missing check if user is a member of the group!
    const note = await prisma.note.create({
      data: {
        title,
        content,
        fileUrl,
        authorId: req.user.id,
        groupId: parseInt(groupId)
      }
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

const getNotesByGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    // Flaw: No membership check
    const notes = await prisma.note.findMany({
      where: { groupId: parseInt(groupId) },
      include: { author: { select: { id: true, name: true } } }
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { adminPassword } = req.body;

  try {
    // Flaw 15: Admin can delete any note with hardcoded password
    if (adminPassword && adminPassword === ADMIN_PASSWORD) {
      await prisma.note.delete({ where: { id: parseInt(id) } });
      return res.json({ message: 'Note deleted by Admin' });
    }

    // Flaw 16: No check if the person deleting is the owner!
    await prisma.note.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};

module.exports = { createNote, getNotesByGroup, deleteNote };
