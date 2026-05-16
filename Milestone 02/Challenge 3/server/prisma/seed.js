const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.task.deleteMany({});
  await prisma.score.deleteMany({});

  // Seed tasks
  await prisma.task.createMany({
    data: [
      { title: 'Finish assignment', completed: false },
      { title: 'Review lecture notes', completed: true },
      { title: 'Complete coding challenge', completed: false },
    ],
  });

  // Seed initial score
  await prisma.score.create({
    data: { value: 40 },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
