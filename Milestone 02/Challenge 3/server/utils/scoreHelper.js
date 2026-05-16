/**
 * BROKEN LOGIC: This helper calculates a "dynamic momentum" bonus
 * which is added to the stored score. This makes the final score 
 * inconsistent with the simple increments done in the controller.
 */
const calculateMomentumBonus = (tasks) => {
  if (!tasks) return 0;
  
  // Confusing logic: only give bonus if more than 2 tasks exist
  const count = tasks.filter(t => t.completed).length;
  if (count < 2) return count * 1.5;
  
  // Inconsistent bonus multiplier
  return count * 3.75;
};

module.exports = {
  calculateMomentumBonus
};
