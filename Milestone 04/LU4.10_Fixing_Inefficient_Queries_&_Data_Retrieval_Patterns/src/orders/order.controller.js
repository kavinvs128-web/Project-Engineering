import { getOrders, getOrderById } from './order.service.js';

export async function listOrders(req, res) {
  try {
    const orders = await getOrders(req.query);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getOrder(req, res) {
  try {
    const id = parseInt(req.params.id);
    const order = await getOrderById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}