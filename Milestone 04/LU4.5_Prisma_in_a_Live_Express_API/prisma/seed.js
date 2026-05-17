const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create sample products
  await prisma.product.createMany({
    data: [
      { name: "Laptop", price: 50000, stock: 10 },
      { name: "Phone", price: 20000, stock: 15 },
      { name: "Headphones", price: 2000, stock: 20 }
    ]
  });

  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });