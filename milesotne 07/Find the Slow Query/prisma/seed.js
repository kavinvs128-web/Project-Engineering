const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting ShopLens Seed Operation ---');

  // Categories and their distribution
  const categories = ['electronics', 'clothing', 'books', 'home', 'sports', 'toys', 'food', 'health'];
  
  // Helper to generate long text
  const generateText = (wordCount) => {
    const words = [
      'premium', 'innovation', 'sleek', 'powerful', 'efficient', 'design', 'future', 'smart', 
      'sustainable', 'expert', 'quality', 'unique', 'reliable', 'integrated', 'versatile',
      'performance', 'modern', 'solution', 'experience', 'advanced', 'customizable', 'durable'
    ];
    let text = '';
    for (let i = 0; i < wordCount; i++) {
      text += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return text.trim();
  };

  const users = [];
  console.log('Seeding 5,000 users...');
  const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  
  for (let i = 0; i < 5000; i++) {
    users.push({
      email: `${firstNames[i % 8].toLowerCase()}.${lastNames[Math.floor(i / 8) % 8].toLowerCase()}.${i}@example.com`,
      name: `${firstNames[i % 8]} ${lastNames[Math.floor(i / 8) % 8]}`,
      bio: generateText(Math.floor(Math.random() * 300) + 200), // 200-500 words
      settings: { theme: 'dark', notifications: true, language: 'en-US', preferences: ['deals', 'electronics'] }
    });
  }
  
  const createdUsers = await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  });
  const allUserIds = (await prisma.user.findMany({ select: { id: true } })).map(u => u.id);
  console.log(`Successfully seeded ${createdUsers.count} users.`);

  console.log('Seeding 50,000 products...');
  const products = [];
  for (let i = 0; i < 50000; i++) {
    // 40% electronics distribution
    const category = Math.random() < 0.4 ? 'electronics' : categories[Math.floor(Math.random() * (categories.length - 1)) + 1];
    products.push({
      name: `ShopLens ${generateText(2)} ${i}`,
      category: category,
      price: parseFloat((Math.random() * 1000 + 10).toFixed(2)),
      description: generateText(Math.floor(Math.random() * 100) + 50),
      metadata: { manufacturer: 'ShopLens Corp', warranty: '2 years', weight: '2kg' }
    });
    
    // Create in chunks of 5000
    if (products.length === 5000) {
      await prisma.product.createMany({ data: products });
      products.length = 0;
      process.stdout.write('.');
    }
  }
  if (products.length > 0) await prisma.product.createMany({ data: products });
  console.log('\nSuccessfully seeded products.');

  const allProductIds = (await prisma.product.findMany({ select: { id: true } })).map(p => p.id);

  console.log('Seeding 25,000 orders...');
  const orders = [];
  const statusOptions = ['DELIVERED', 'SHIPPED', 'CANCELLED', 'PENDING'];
  for (let i = 0; i < 25000; i++) {
    orders.push({
      userId: allUserIds[Math.floor(Math.random() * allUserIds.length)],
      total: 0, // calculated later
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    });
    
    if (orders.length === 5000) {
      await prisma.order.createMany({ data: orders });
      orders.length = 0;
      process.stdout.write('.');
    }
  }
  if (orders.length > 0) await prisma.order.createMany({ data: orders });
  console.log('\nSuccessfully seeded orders.');

  const allOrderIds = (await prisma.order.findMany({ select: { id: true } })).map(o => o.id);

  console.log('Seeding 75,000 order items...');
  const orderItems = [];
  for (let i = 0; i < 75000; i++) {
    orderItems.push({
      orderId: allOrderIds[Math.floor(Math.random() * allOrderIds.length)],
      productId: allProductIds[Math.floor(Math.random() * allProductIds.length)],
      quantity: Math.floor(Math.random() * 5) + 1,
      price: parseFloat((Math.random() * 500 + 5).toFixed(2))
    });

    if (orderItems.length === 5000) {
      await prisma.orderItem.createMany({ data: orderItems });
      orderItems.length = 0;
      process.stdout.write('.');
    }
  }
  if (orderItems.length > 0) await prisma.orderItem.createMany({ data: orderItems });
  console.log('\nSuccessfully seeded order items.');

  console.log('Seeding 100,000 activities...');
  const activities = [];
  const activityTypes = ['VIEW_PRODUCT', 'ADD_TO_CART', 'SEARCH', 'WISH_LIST', 'PROFILE_UPDATE'];
  for (let i = 0; i < 100000; i++) {
    activities.push({
      userId: allUserIds[Math.floor(Math.random() * allUserIds.length)],
      type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
      metadata: generateText(Math.floor(Math.random() * 200) + 300), // 300-500 words
      notes: generateText(Math.floor(Math.random() * 200) + 300),    // 300-500 words
      data: { browser: 'Chrome', os: 'MacOS', screenResolution: '1920x1080' },
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    });

    if (activities.length === 5000) {
      await prisma.activity.createMany({ data: activities });
      activities.length = 0;
      process.stdout.write('.');
    }
  }
  if (activities.length > 0) await prisma.activity.createMany({ data: activities });
  
  console.log('\n--- Seeding Complete ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
