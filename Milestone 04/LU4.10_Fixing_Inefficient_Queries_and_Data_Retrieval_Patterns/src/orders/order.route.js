import { Router } from 'express';
import { listOrders, getOrder } from './order.controller.js';

const router = Router();

router.get('/', listOrders);
router.get('/:id', getOrder);

export default router;