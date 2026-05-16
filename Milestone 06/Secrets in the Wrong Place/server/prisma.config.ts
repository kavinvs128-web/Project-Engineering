import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    // Flaw 2: Hardcoded database URL in programmatic config
    url: 'postgresql://postgres:password@localhost:5432/studyhub'
  }
});
