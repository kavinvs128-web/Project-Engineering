const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const CATEGORIES = [
  'electronics',
  'clothing',
  'books',
  'home',
  'sports',
  'toys',
  'food',
  'health',
];

const DESCRIPTIONS = [
  'A high-quality product built to last, designed with the modern consumer in mind.',
  'Crafted from premium materials, this item delivers outstanding value and performance.',
  'A best-seller in its category — trusted by thousands of happy customers worldwide.',
  'Engineered for durability and ease of use, perfect for everyday needs.',
  'An essential addition to your collection, offering both style and functionality.',
  'Designed with precision, this product exceeds industry standards for quality.',
  'Lightweight yet sturdy, making it ideal for home, travel, and everything in between.',
  'Backed by a satisfaction guarantee, this product speaks for itself.',
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProducts(start, count) {
  const products = [];
  for (let i = start; i < start + count; i++) {
    const n = i + 1; // 1-indexed product number
    const category = CATEGORIES[(n - 1) % CATEGORIES.length];
    const price = parseFloat(randomBetween(4.99, 499.99).toFixed(2));
    const stock = randomInt(0, 500);
    const description =
      DESCRIPTIONS[n % DESCRIPTIONS.length] +
      ' ' +
      DESCRIPTIONS[(n + 3) % DESCRIPTIONS.length];

    products.push({
      name: `Product ${n} - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
      description,
      price,
      category,
      stock,
      imageUrl: `https://picsum.photos/seed/product-${n}/400/300`,
    });
  }
  return products;
}

async function main() {
  console.log('[ShopGrid] Starting seed — 10,000 products...');
  const startTime = Date.now();

  const TOTAL = 10_000;
  const BATCH_SIZE = 500;

  // Clear existing data
  await prisma.product.deleteMany();
  console.log('[ShopGrid] Cleared existing products.');

  let seeded = 0;

  for (let offset = 0; offset < TOTAL; offset += BATCH_SIZE) {
    const batch = generateProducts(offset, Math.min(BATCH_SIZE, TOTAL - offset));

    await prisma.product.createMany({ data: batch });

    seeded += batch.length;

    if (seeded % 1000 === 0) {
      console.log(`[ShopGrid] Seeded ${seeded}/${TOTAL}...`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`[ShopGrid] Done! Seeded ${seeded} products in ${elapsed}s.`);
}

main()
  .catch((e) => {
    console.error('[ShopGrid] Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
