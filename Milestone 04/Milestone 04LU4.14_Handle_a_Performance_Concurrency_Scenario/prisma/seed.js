// prisma/seed.js
// Seeds the database with sample data for testing

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { name: 'Alice', email: 'alice@example.com' }
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { name: 'Bob', email: 'bob@example.com' }
  });

  // Create a show
  const show = await prisma.show.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Coldplay Live 2025',
      venue: 'DY Patil Stadium, Mumbai',
      date: new Date('2025-12-15T19:00:00Z')
    }
  });

  // Create seats 1-5
  for (let i = 1; i <= 5; i++) {
    await prisma.seat.upsert({
      where: { id: i },
      update: {},
      create: { id: i, number: `A${i}`, showId: show.id }
    });
  }

  console.log('✅ Seed complete');
  console.log(`   Users: alice (id: ${alice.id}), bob (id: ${bob.id})`);
  console.log(`   Show: "${show.name}" (id: ${show.id})`);
  console.log('   Seats: A1–A5 (id: 1–5)');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
