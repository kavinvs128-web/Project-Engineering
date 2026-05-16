const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getProject = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { members: { include: { user: true } } }
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      take: 50
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
