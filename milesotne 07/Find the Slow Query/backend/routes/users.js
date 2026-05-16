const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// SLOW ENDPOINT 3 — SELECT * on a wide table with large text columns
// User Activity Log (1.5-3 seconds)
router.get('/:id/activity', async (req, res) => {
  const { id } = req.params;

  try {
    // This query generates a SELECT * which includes the large 'metadata' and 'notes' Text columns.
    // Without an index on userId, this results in a Seq Scan.
    // The high row width will make this query significantly slower.
    const activities = await prisma.activity.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
