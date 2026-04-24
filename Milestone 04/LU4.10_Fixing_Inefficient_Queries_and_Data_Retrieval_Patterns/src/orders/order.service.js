import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'], // Leaves query logging on to expose the N+1 crime
});

export async function getOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // 💀 N+1 Loop - fetching users one by one
  const ordersWithUsers = await Promise.all(
    orders.map(async (order) => {
      const user = await prisma.user.findUnique({
        where: { id: order.userId },
      });
      return { ...order, user };
    })
  );

  return ordersWithUsers;
}

export async function getOrderById(id) {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return null;

  const user = await prisma.user.findUnique({ where: { id: order.userId } });
  return { ...order, user };
}