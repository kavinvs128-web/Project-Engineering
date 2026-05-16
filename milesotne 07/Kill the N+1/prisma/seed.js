import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  { name: 'Alice Hartman', email: 'alice.hartman@example.com' },
  { name: 'Ben Okafor', email: 'ben.okafor@example.com' },
  { name: 'Clara Simmons', email: 'clara.simmons@example.com' },
  { name: 'David Nguyen', email: 'david.nguyen@example.com' },
  { name: 'Emma Caldwell', email: 'emma.caldwell@example.com' },
];

const postsByUser = [
  [
    {
      title: 'Getting Started with Microservices',
      body: 'Microservices allow teams to deploy independently and scale individual components without affecting the entire system.',
    },
    {
      title: 'REST vs GraphQL: A Practical Comparison',
      body: 'When designing APIs, the choice between REST and GraphQL depends on your data access patterns and client requirements.',
    },
    {
      title: 'Understanding Event-Driven Architecture',
      body: 'Event-driven systems decouple producers and consumers, enabling greater resilience and scalability across distributed services.',
    },
    {
      title: 'The Case for API Versioning',
      body: 'Versioning your API from day one prevents breaking changes from disrupting your consumers as the product evolves.',
    },
  ],
  [
    {
      title: 'Database Indexing Fundamentals',
      body: 'Indexes speed up read queries but come at a cost to write performance. Choosing the right columns to index is a critical skill.',
    },
    {
      title: 'Why Connection Pooling Matters',
      body: 'Opening a new database connection for every request is expensive. Connection pooling reuses existing connections to reduce overhead.',
    },
    {
      title: 'Introduction to CQRS',
      body: 'Command Query Responsibility Segregation separates read and write models, allowing each to be optimised independently.',
    },
    {
      title: 'Pagination Strategies for Large Datasets',
      body: 'Offset-based pagination is simple but problematic at scale. Cursor-based pagination offers more predictable performance.',
    },
  ],
  [
    {
      title: 'Effective Docker Compose Workflows',
      body: 'Docker Compose simplifies local development by defining multi-container environments in a single declarative file.',
    },
    {
      title: 'Secrets Management in Production',
      body: 'Hardcoding secrets in environment files works locally but is a serious security risk in production environments.',
    },
    {
      title: 'Structured Logging with Pino',
      body: 'Structured JSON logs are easier to parse, search, and alert on compared to plain text output in production systems.',
    },
    {
      title: 'Health Checks and Readiness Probes',
      body: "A health endpoint gives your orchestrator visibility into whether the application is ready to accept traffic.",
    },
  ],
  [
    {
      title: 'Rate Limiting Strategies for Public APIs',
      body: 'Rate limiting protects your service from abuse. Token bucket and sliding window are two common algorithms to consider.',
    },
    {
      title: 'Centralising Error Handling in Express',
      body: 'A global error handler middleware keeps your route code clean and ensures consistent error responses across all endpoints.',
    },
    {
      title: 'Caching with Redis: When and Why',
      body: 'Redis is an excellent caching layer for frequently read data, reducing database load and improving response latency.',
    },
    {
      title: 'Designing Idempotent APIs',
      body: 'Idempotent endpoints allow clients to safely retry requests without risk of duplicate side effects in your system.',
    },
  ],
  [
    {
      title: 'Observability vs Monitoring',
      body: 'Monitoring tells you when something is wrong. Observability helps you understand why. Both are essential in production.',
    },
    {
      title: 'Graceful Shutdown in Node.js',
      body: 'Handling SIGTERM correctly ensures in-flight requests complete before the process exits during a deployment or restart.',
    },
    {
      title: 'Understanding Backpressure in Streams',
      body: 'Backpressure prevents fast producers from overwhelming slow consumers, a critical concept when working with Node.js streams.',
    },
    {
      title: 'Writing Meaningful Integration Tests',
      body: 'Integration tests that cover real database interactions catch bugs that unit tests with mocks routinely miss.',
    },
  ],
];

const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const productCatalogue = [
  { name: 'Wireless Mechanical Keyboard', price: 129.99 },
  { name: 'Ergonomic Mouse Pad', price: 34.95 },
  { name: 'USB-C Docking Station', price: 89.00 },
  { name: 'Adjustable Monitor Stand', price: 54.50 },
  { name: '27-inch 4K Monitor', price: 449.00 },
  { name: 'Noise-Cancelling Headphones', price: 199.99 },
  { name: 'Portable SSD 1TB', price: 109.95 },
  { name: 'Webcam HD 1080p', price: 79.00 },
  { name: 'LED Desk Lamp', price: 45.00 },
  { name: 'Laptop Stand Aluminium', price: 62.00 },
  { name: 'Cable Management Tray', price: 19.99 },
  { name: 'Wireless Charging Pad', price: 29.95 },
  { name: 'Smart Power Strip', price: 49.00 },
  { name: 'Blue Light Blocking Glasses', price: 27.50 },
  { name: 'Mesh Office Chair', price: 349.00 },
];

const ordersData = [
  { reference: 'ORD-001', status: 'delivered', itemCount: 3 },
  { reference: 'ORD-002', status: 'shipped', itemCount: 2 },
  { reference: 'ORD-003', status: 'processing', itemCount: 4 },
  { reference: 'ORD-004', status: 'pending', itemCount: 2 },
  { reference: 'ORD-005', status: 'delivered', itemCount: 3 },
  { reference: 'ORD-006', status: 'cancelled', itemCount: 2 },
  { reference: 'ORD-007', status: 'delivered', itemCount: 4 },
  { reference: 'ORD-008', status: 'shipped', itemCount: 2 },
  { reference: 'ORD-009', status: 'processing', itemCount: 3 },
  { reference: 'ORD-010', status: 'pending', itemCount: 2 },
  { reference: 'ORD-011', status: 'delivered', itemCount: 4 },
  { reference: 'ORD-012', status: 'shipped', itemCount: 3 },
  { reference: 'ORD-013', status: 'delivered', itemCount: 2 },
  { reference: 'ORD-014', status: 'processing', itemCount: 3 },
  { reference: 'ORD-015', status: 'pending', itemCount: 2 },
  { reference: 'ORD-016', status: 'cancelled', itemCount: 4 },
  { reference: 'ORD-017', status: 'delivered', itemCount: 2 },
  { reference: 'ORD-018', status: 'shipped', itemCount: 3 },
  { reference: 'ORD-019', status: 'delivered', itemCount: 2 },
  { reference: 'ORD-020', status: 'processing', itemCount: 4 },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const createdUsers = [];
  for (const userData of users) {
    const user = await prisma.user.create({ data: userData });
    createdUsers.push(user);
  }

  for (let i = 0; i < createdUsers.length; i++) {
    const user = createdUsers[i];
    const userPosts = postsByUser[i];
    for (const postData of userPosts) {
      await prisma.post.create({
        data: {
          title: postData.title,
          body: postData.body,
          authorId: user.id,
        },
      });
    }
  }

  let productIndex = 0;
  for (const orderData of ordersData) {
    const order = await prisma.order.create({
      data: {
        reference: orderData.reference,
        status: orderData.status,
      },
    });

    for (let i = 0; i < orderData.itemCount; i++) {
      const product = productCatalogue[productIndex % productCatalogue.length];
      productIndex++;
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productName: product.name,
          quantity: Math.floor(i / 2) + 1,
          price: product.price,
        },
      });
    }
  }

  console.log('✅ Seeded: 5 users, 20 posts, 20 orders');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
