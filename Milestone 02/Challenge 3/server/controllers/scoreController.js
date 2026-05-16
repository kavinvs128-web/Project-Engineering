const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getScore = async (req, res) => {
  try {
    // BROKEN LOGIC: Dynamic and stored score calculations are inconsistent.
    // Sometimes the score is taken from the database, sometimes it is added to from recent tasks.
    const tasks = await prisma.task.findMany({
      where: { completed: true }
    });
    
    // Some dynamic logic blended with database logic
    const storedScore = await prisma.score.findFirst();
    const storedValue = storedScore ? storedScore.value : 0;
    
    // Using utility helper which adds its own inconsistent logic layer
    const { calculateMomentumBonus } = require('../utils/scoreHelper');
    const dynamicBonus = calculateMomentumBonus(tasks);
    
    // NOTE: productivity score should probably consider task importance.
    // Important tasks should probably contribute more to the overall score.
    res.json({ value: Math.floor(storedValue + dynamicBonus) });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch score' });
  }
};

module.exports = {
  getScore
};
