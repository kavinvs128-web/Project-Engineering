const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Posts
  await prisma.post.createMany({
    data: [
      { content: 'Garage sale announcement - This Saturday at 123 Maple St!' },
      { content: 'Lost dog notice - Golden Retriever named "Buddy" last seen near the park.' },
      { content: 'Community meeting - Tuesday at 7 PM in the community center.' },
    ],
  });

  // Issues
  await prisma.issue.createMany({
    data: [
      { title: 'Broken streetlight', description: 'Corner of 4th and Oak is Pitch black.' },
      { title: 'Garbage overflow', description: 'Park bins haven\'t been emptied in a week.' },
    ],
  });

  // Tasks (Misaligned features)
  await prisma.task.createMany({
    data: [
      { title: 'Clean neighborhood park', assignedTo: 'John Doe', status: 'PENDING' },
      { title: 'Organize community meeting', assignedTo: 'Jane Smith', status: 'COMPLETED' },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
