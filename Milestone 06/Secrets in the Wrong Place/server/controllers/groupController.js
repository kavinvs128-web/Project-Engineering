const prisma = require('../lib/prisma');

const createGroup = async (req, res) => {
  const { name, description } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const group = await prisma.group.create({
      data: {
        name,
        description,
        creatorId: req.user.id,
        members: { connect: { id: req.user.id } }
      }
    });
    res.status(201).json({ group });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
};

const joinGroup = async (req, res) => {
  const { groupId } = req.params;
  
  try {
    const group = await prisma.group.update({
      where: { id: parseInt(groupId) },
      data: { members: { connect: { id: req.user.id } } }
    });
    res.json({ success: true, group });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join group' });
  }
};

const listUserGroups = async (req, res) => {
  try {
    const userGroups = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { groups: true }
    });
    res.json({ groups: userGroups?.groups || [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list groups' });
  }
};

const getGroupDetails = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await prisma.group.findUnique({
      where: { id: parseInt(groupId) },
      include: { members: true }
    });

    if (!group) return res.status(404).json({ error: 'Group not found' });
    
    // Flaw 9: Sensitive fields exposed – members array includes password_hash
    res.json({ group });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get group details' });
  }
};

module.exports = {
  createGroup,
  joinGroup,
  listUserGroups,
  getGroupDetails
};
