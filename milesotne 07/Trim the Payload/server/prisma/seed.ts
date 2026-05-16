import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Categories
  const categories = await Promise.all(
    ['Electronics', 'Apparel', 'Home & Garden', 'Sports', 'Books'].map((name) =>
      prisma.category.create({
        data: {
          name,
          description: faker.commerce.productDescription(),
        },
      })
    )
  );

  // 2. Products
  const products = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
          stock: faker.number.int({ min: 0, max: 100 }),
          image: faker.image.urlLoremFlickr({ category: 'product' }),
          categoryId: categories[Math.floor(Math.random() * categories.length)].id,
        },
      })
    )
  );

  // 3. Users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          address: faker.location.streetAddress({ useFullAddress: true }),
          avatarUrl: faker.image.avatar(),
          bio: faker.lorem.paragraph(),
        },
      })
    )
  );

  // 4. Orders (500 realistic orders to test pagination)
  for (let i = 0; i < 500; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const numItems = faker.number.int({ min: 1, max: 5 });
    
    const itemsData = Array.from({ length: numItems }).map(() => {
      const product = products[Math.floor(Math.random() * products.length)];
      return {
        productId: product.id,
        quantity: faker.number.int({ min: 1, max: 3 }),
        price: product.price,
      };
    });

    const total = itemsData.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await prisma.order.create({
      data: {
        userId: user.id,
        total,
        status: faker.helpers.arrayElement(['PENDING', 'COMPLETED', 'SHIPPED', 'CANCELLED']),
        createdAt: faker.date.past(),
        items: {
          create: itemsData,
        },
      },
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
