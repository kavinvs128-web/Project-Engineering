require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // ── Users ──────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@shopadmin.com' },
    update: {},
    create: {
      email: 'admin@shopadmin.com',
      password: hashedPassword,
      role: 'admin',
      name: 'Admin User',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@shopadmin.com' },
    update: {},
    create: {
      email: 'customer@shopadmin.com',
      password: hashedPassword,
      role: 'customer',
      name: 'Customer User',
    },
  });

  console.log(`Seeded: ${admin.email} (${admin.role}), ${customer.email} (${customer.role})`);

  // ── Products ───────────────────────────────────────────────────────────────
  const products = [
    {
      name: 'Noise-Cancelling Headphones',
      description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
      price: 249.99,
      category: 'Electronics',
      published: true,
    },
    {
      name: 'Ergonomic Office Chair',
      description: 'Lumbar-support mesh chair with adjustable armrests and breathable fabric.',
      price: 399.0,
      category: 'Furniture',
      published: true,
    },
    {
      name: 'Ceramic Pour-Over Coffee Set',
      description: 'Hand-crafted ceramic dripper with matching carafe and two mugs.',
      price: 64.95,
      category: 'Kitchen',
      published: true,
    },
    {
      name: 'Mechanical Keyboard — Compact 75%',
      description: 'Hot-swappable switches, RGB backlight, and aluminium frame. Not yet released.',
      price: 139.0,
      category: 'Electronics',
      published: false, // unpublished — draft product
    },
    {
      name: 'Merino Wool Running Socks (3-Pack)',
      description: 'Breathable, anti-blister socks with arch compression. Available soon.',
      price: 28.5,
      category: 'Apparel',
      published: false, // unpublished — coming soon
    },
  ];

  for (const data of products) {
    const product = await prisma.product.create({ data });
    const status = product.published ? '✅ published' : '📦 draft   ';
    console.log(`  ${status}  ${product.name} — $${product.price.toFixed(2)} (${product.category})`);
  }

  console.log('\n✅ Seed complete.');
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
