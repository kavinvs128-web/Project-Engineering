// src/config/db.js
// Prisma client configuration

const { PrismaClient } = require("@prisma/client");

// Correct — reads DATABASE_URL from environment via schema.prisma
const prisma = new PrismaClient();

module.exports = prisma;
