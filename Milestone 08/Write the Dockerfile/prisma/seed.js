const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.shipment.upsert({
    where: { trackingId: 'TRK123456' },
    update: {},
    create: {
      trackingId: 'TRK123456',
      status: 'IN_TRANSIT',
      origin: 'New York, NY',
      destination: 'Los Angeles, CA'
    }
  });

  await prisma.shipment.upsert({
    where: { trackingId: 'TRK789012' },
    update: {},
    create: {
      trackingId: 'TRK789012',
      status: 'DELIVERED',
      origin: 'Chicago, IL',
      destination: 'Austin, TX'
    }
  });

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
