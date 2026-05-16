const { PrismaClient } = require('@prisma/client');

// Prisma Client instantiation - NO query logging here for students
// (They must add { log: ['query', 'info', 'warn', 'error'] } themselves)
const prisma = new PrismaClient();

module.exports = prisma;
