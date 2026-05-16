// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create User 1
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      isActive: true,
      posts: {
        create: [
          { title: 'My First Post', content: 'Hello world!', published: true },
          { title: 'Draft Post', content: 'Not ready yet...', published: false },
        ],
      },
    },
  });

  // Create User 2
  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob@example.com',
      isActive: true,
      posts: {
        create: [
          { title: 'Backend Architecture 101', content: 'Controllers are cool.', published: true },
        ],
      },
    },
  });

  console.log({ alice, bob });
  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });