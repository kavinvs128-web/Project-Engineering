const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// SLOW ENDPOINT 2 — N+1 query pattern (Explicit loop, no include/join)
// Recent Orders with User info
router.get('/recent', async (req, res) => {
  try {
    // Stage 1: Fetch recent orders (1 query)
    const orders = await prisma.order.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' }
    });

    // Stage 2: Fetch each user separately (THE N+1 PATTERN)
    // For 20 orders, this fires 20 additional user queries
    const ordersWithUsers = await Promise.all(
      orders.map(async (order) => {
        const user = await prisma.user.findUnique({
          where: { id: order.userId }
        });
        
        return {
          ...order,
          user: {
            name: user.name,
            email: user.email
          }
        };
      })
    );

    res.json({
      success: true,
      data: ordersWithUsers
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
