const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const task = await prisma.task.create({
      data: { title }
    });
    
    // TODO: Client mentioned "important tasks" but this was never implemented.
    // We should probably track if a task is "important" here.

    
    // BROKEN LOGIC: Inconsistently update score on task creation
    // This part updates the database record directly
    const currentScore = await prisma.score.findFirst();
    if (currentScore) {
      await prisma.score.update({
        where: { id: currentScore.id },
        data: { value: currentScore.value + 5 }
      });
    } else {
      await prisma.score.create({ data: { value: 5 } });
    }

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed }
    });

    // NOTE: productivity score should probably consider task importance.
    // If a task is "important", it should yield more points.


    // BROKEN LOGIC: Completing a task increases score again
    if (completed) {
      const currentScore = await prisma.score.findFirst();
      if (currentScore) {
        await prisma.score.update({
          where: { id: currentScore.id },
          data: { value: currentScore.value + 10 }
        });
      }
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });
    // BROKEN LOGIC: Deleting a task does not reduce the score.
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
