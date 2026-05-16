const prisma = require('../prismaClient');

exports.getIssues = async (req, res) => {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
};

exports.createIssue = async (req, res) => {
  try {
    const { title, description } = req.body;
    const issue = await prisma.issue.create({
      data: { title, description }
    });
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create issue' });
  }
};

exports.updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const issue = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update issue' });
  }
};
