import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getProducts(_query) {
  // 🚨 Firehose problem: returns everything, ignores all parameters
  const products = await prisma.product.findMany();
  return products;
}

export async function getProductById(id) {
  return prisma.product.findUnique({ where: { id } });
}