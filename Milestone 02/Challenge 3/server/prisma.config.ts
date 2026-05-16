import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // The location of your schema file
  schema: "prisma/schema.prisma",

  // Configuration for migrations
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },

  // The database configuration
  datasource: {
    url: env("DATABASE_URL"),
  },
});
