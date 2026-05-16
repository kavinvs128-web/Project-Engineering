const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Bottleneck #3: GET /api/tasks/:id/comments
// SELECT * FROM "Comment" WHERE "taskId" = $1 ORDER BY "createdAt" ASC
// Missing: @@index([taskId, createdAt])
exports.getTaskComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        taskId: parseInt(taskId)
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;
    const authorId = req.user.userId; // Provided by authMiddleware if logged in

    const comment = await prisma.comment.create({
      data: {
        content,
        taskId: parseInt(taskId),
        authorId
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
