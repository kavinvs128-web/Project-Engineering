import prisma from '../../lib/prisma.js';

export async function getAllOrdersWithItems() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  for (const order of orders) {
    const items = await prisma.orderItem.findMany({
      where: { orderId: order.id },
      select: { id: true, productName: true, quantity: true, price: true },
    });
    order.items = items;
  }

  return orders.map((order) => ({
    id: order.id,
    reference: order.reference,
    status: order.status,
    createdAt: order.createdAt,
    items: order.items,
  }));
}
