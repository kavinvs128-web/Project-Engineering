const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function purchaseItem(req, res) {
  try {
    const { userId, productId } = req.body;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    console.log('Product price:', product.price); 

    const order = await prisma.order.create({
      data: { userId, productId, quantity: 1 },
    });

    await prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: 1 } },
    });

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOrdersByUser(req, res) {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await prisma.order.findMany({ where: { userId } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { purchaseItem, getOrdersByUser };