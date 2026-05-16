import express from 'express';
import cors from 'cors';
import { prisma } from './prisma.config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// BROKEN ENDPOINT: Multiple performance killers
app.get('/api/orders', async (req, res) => {
  try {
    // PROBLEM 1: No Pagination (Fetching all 500+ records at once)
    const baseOrders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // PROBLEM 2: N+1 Query Issue (Fetching related data in a loop instead of a join)
    // This will fire 500+ separate database queries
    const ordersWithDetails = [];
    for (const order of baseOrders) {
      const user = await prisma.user.findUnique({ where: { id: order.userId } });
      const items = await prisma.orderItem.findMany({ 
        where: { orderId: order.id },
        include: { product: true } 
      });
      ordersWithDetails.push({ ...order, user, items });
    }

    // PROBLEM 3: Blocking Event Loop (Sync processing of a large array)
    // Simulating heavy data transformation that freezes the server
    const processedData = ordersWithDetails.map(order => {
      const start = Date.now();
      while (Date.now() - start < 1) { /* Artificial 1ms block per order */ }
      return {
        ...order,
        _metadata: { processedAt: new Date().toISOString() }
      };
    });

    res.json(processedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'broken' });
});

app.listen(PORT, () => {
  console.log(`Broken Server running at http://localhost:${PORT}`);
});
