const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Seed Process ---');
  const startTime = Date.now();

  // 1. Clean up existing data
  console.log('Cleaning up existing data...');
  await prisma.comment.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.projectMember.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash('user123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);

  // 2. Create 10,000 Users
  console.log('Seeding 10,000 users...');
  const usersData = [
    {
      email: 'admin@trackflow.io',
      name: 'System Admin',
      password: adminPassword,
      role: 'admin',
    },
    {
      email: 'user1@trackflow.io',
      name: 'User One',
      password: hashedPassword,
      role: 'user',
    },
  ];

  // Fill up the rest level to 10k
  for (let i = 2; i < 10000; i++) {
    usersData.push({
      email: `user${i}@trackflow.io`,
      name: `User ${i}`,
      password: hashedPassword,
      role: 'user',
    });
  }

  // Batch insert users (Prisma createMany is very fast)
  await prisma.user.createMany({ data: usersData });
  const allUsers = await prisma.user.findMany({ select: { id: true } });
  const userIds = allUsers.map(u => u.id);

  // 3. Create 5,000 Projects
  console.log('Seeding 5,000 projects...');
  const projectsData = [];
  for (let i = 1; i <= 5000; i++) {
    projectsData.push({
      name: `Project ${i}`,
      description: `Description for project ${i}`,
    });
  }
  await prisma.project.createMany({ data: projectsData });
  const allProjects = await prisma.project.findMany({ select: { id: true } });
  const projectIds = allProjects.map(p => p.id);

  // 4. Create 500,000 Tasks
  // Distributed: ~50 tasks per project, ~50 assigned per user.
  console.log('Seeding 500,000 tasks (using batches)...');
  const totalTasks = 500000;
  const batchSize = 10000;
  const statuses = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];
  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

  for (let i = 0; i < totalTasks; i += batchSize) {
    const tasksBatch = [];
    for (let j = 0; j < batchSize; j++) {
      const taskIndex = i + j;
      const projectId = projectIds[taskIndex % projectIds.length];
      const assignedUserId = userIds[taskIndex % userIds.length];
      
      tasksBatch.push({
        title: `Task ${taskIndex}`,
        description: `This is the description for task ${taskIndex}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        projectId,
        assignedUserId,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Spread over time
      });
    }
    await prisma.task.createMany({ data: tasksBatch });
    if ((i + batchSize) % 50000 === 0) {
      console.log(`Seeded ${i + batchSize} tasks...`);
    }
  }

  const allTasks = await prisma.task.findMany({ 
    select: { id: true },
    take: 50000 // Get some sample task IDs for comments
  });
  const taskIdsForComments = allTasks.map(t => t.id);

  // 5. Create 50,000 Comments (approx 0.1 per task)
  console.log('Seeding 50,000 comments...');
  const totalComments = 50000;
  const commentsBatchSize = 5000;

  for (let i = 0; i < totalComments; i += commentsBatchSize) {
    const commentsBatch = [];
    for (let j = 0; j < commentsBatchSize; j++) {
      const commentIndex = i + j;
      const taskId = taskIdsForComments[commentIndex % taskIdsForComments.length];
      const authorId = userIds[Math.floor(Math.random() * userIds.length)];

      commentsBatch.push({
        content: `Insightful comment #${commentIndex} on task.`,
        taskId,
        authorId,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      });
    }
    await prisma.comment.createMany({ data: commentsBatch });
  }

  const duration = (Date.now() - startTime) / 1000;
  console.log(`--- Seed Finished in ${duration.toFixed(2)} seconds ---`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
