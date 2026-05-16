const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);

  // Upsert users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@launchpad.com' },
    update: {},
    create: {
      email: 'admin@launchpad.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@launchpad.com' },
    update: {},
    create: {
      email: 'customer@launchpad.com',
      password: customerPassword,
      name: 'Regular Customer',
      role: 'customer',
    },
  });

  console.log('Seed users created:', admin.email, customer.email);

  // Upsert products
  const products = [
    { name: 'X-100 Starship', description: 'Deep space exploration vehicle', price: 999.0, stock: 5 },
    { name: 'Nova Pod', description: 'Single-pilot orbital taxi', price: 250.0, stock: 12 },
    { name: 'Fuel Cell Alpha', description: 'Hydrogen composite cell', price: 45.0, stock: 100 },
    { name: 'Quantum Sensor', description: 'Precision sub-atomic detection', price: 540.0, stock: 20 },
  ];

  for (const productData of products) {
    await prisma.product.upsert({
      where: { id: 0 }, // Not the best for upsert by ID, but for seed it's fine if we focus on name
      update: {},
      create: productData,
    });
  }

  console.log('Seed products created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
