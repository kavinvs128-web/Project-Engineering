import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning up existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('📦 Seeding Products...');
  const products = [];
  for (let i = 1; i <= 500; i++) {
    products.push({
      name: `Product ${i}`,
      description: `Description for product ${i}`,
      price: Number((Math.random() * 100).toFixed(2)),
      category: i % 2 === 0 ? 'Electronics' : 'Groceries',
      stock: Math.floor(Math.random() * 100),
      imageUrl: `https://via.placeholder.com/150?text=Product+${i}`,
    });
  }
  await prisma.product.createMany({ data: products });
  const savedProducts = await prisma.product.findMany();

  console.log('👤 Seeding Users...');
  const users = [];
  for (let i = 1; i <= 50; i++) {
    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      passwordHash: `hashed_password_${i}_SECRET`,
    });
  }
  await prisma.user.createMany({ data: users });
  const savedUsers = await prisma.user.findMany();

  console.log('🛒 Seeding Orders...');
  for (let i = 0; i < 200; i++) {
    const randomUser = savedUsers[Math.floor(Math.random() * savedUsers.length)];
    const randomProduct = savedProducts[Math.floor(Math.random() * savedProducts.length)];
    
    await prisma.order.create({
      data: {
        userId: randomUser.id,
        totalAmount: randomProduct.price * 2,
        status: i % 3 === 0 ? 'delivered' : 'pending',
        items: {
          create: [{ productId: randomProduct.id, quantity: 2, price: randomProduct.price }]
        }
      }
    });
  }
  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });