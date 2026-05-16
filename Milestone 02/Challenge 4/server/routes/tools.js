const express = require('express');
const router = express.Router();
const prisma = require('../prisma.config');

// GET /tools - Fetch all tools
router.get('/tools', async (req, res) => {
  try {
    const tools = await prisma.tool.findMany();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// BUG 1: Tool Creation Does Not Persist
// The bug here is that we create the tool in memory but don't call Prisma.
router.post("/tools", async (req, res) => {
  const toolData = {
    name: req.body.name,
    description: req.body.description,
    isAvailable: true
  };

  // THE BUG: We skip prisma.tool.create() and return a mock object
  const tool = { id: Date.now(), ...toolData };

  res.status(201).json(tool);
});

// PATCH /tools/:id - Borrow/Return tool
router.patch("/tools/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const existingTool = await prisma.tool.findUnique({ where: { id: parseInt(id) } });
    
    if (existingTool) {
      const updatedTool = await prisma.tool.update({
        where: { id: parseInt(id) },
        data: { isAvailable: !existingTool.isAvailable }
      });
      res.json(updatedTool);
    } else {
      res.status(404).json({ message: "Tool not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
