const prisma = require('../prismaClient');

exports.getMetrics = async (req, res) => {
  try {
    const totalPosts = await prisma.post.count();
    const totalIssues = await prisma.issue.count();
    const tasksCompleted = await prisma.task.count({
      where: { status: 'COMPLETED' }
    });
    
    // Example activity score (simple calculation)
    const activityScore = totalPosts * 5 + totalIssues * 10 + tasksCompleted * 20;

    res.json({
      totalPosts,
      totalIssues,
      tasksCompleted,
      activityScore
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};
