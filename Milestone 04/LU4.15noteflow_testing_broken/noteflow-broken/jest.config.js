// jest.config.js
//
// ❌ FLAW 1: testEnvironment is set to 'browser'.
// Node.js APIs (like http.createServer used by Supertest) do not exist
// in the browser environment. Every test will fail with:
//   "ReferenceError: TextEncoder is not defined" or similar browser-only errors.
//
// Fix: change 'browser' to 'node'.

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'browser',   // ❌ wrong — should be 'node'
  testMatch: ['**/__tests__/**/*.test.js'],
  verbose: true,
};

module.exports = config;
