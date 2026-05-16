const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  try {
    const { assignedUserId, projectId, status } = req.query;
    const where = {};
    const orderBy = [];

    // Bottleneck #1: GET /api/tasks?assignedUserId=:id
    // This query pattern must produce a Seq Scan because assignedUserId and createdAt are missing a composite index.
    if (assignedUserId) {
      where.assignedUserId = parseInt(assignedUserId);
      orderBy.push({ createdAt: 'desc' });
    }

    // Bottleneck #2: GET /api/projects/:id/tasks?status=:status is often handled by a separate route
    // but we can make this general getTasks handle various filters.
    if (projectId) where.projectId = parseInt(projectId);
    if (status) where.status = status;

    const tasks = await prisma.task.findMany({
      where,
      orderBy: orderBy.length ? orderBy : undefined,
      take: 20
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { project: true, assignedUser: true }
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    
    // Bottleneck #2: SELECT * FROM "Task" WHERE "projectId" = $1 AND "status" = $2
    // Missing: @@index([projectId, status])
    const tasks = await prisma.task.findMany({
      where: {
        projectId: parseInt(id),
        status: status || undefined
      }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
