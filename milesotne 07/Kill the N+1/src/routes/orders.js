import { Router } from 'express';
import { getAllOrdersWithItems } from '../services/orderService.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const orders = await getAllOrdersWithItems();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
