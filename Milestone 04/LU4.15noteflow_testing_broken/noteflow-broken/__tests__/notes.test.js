// __tests__/notes.test.js
//
// NoteFlow API — Test Suite
//
// This file has SIX flaws. Your job is to find and fix all of them.
// Run `npm test` to see which tests fail and why.
// Fix the tests AND the broken endpoint code in src/routes/notes.js.
//
// Flaws summary (don't read until you've tried to find them yourself):
//   1. jest.config.js — wrong testEnvironment (browser vs node)
//   2. Happy path POST — wrong expected status code
//   3. Happy path GET  — wrong expected response field
//   4. Failure path GET — mock not set up for the null (not-found) case
//   5. Failure path POST — wrong expected status code for validation error
//   6. Edge case — mock not reset between tests, state bleeds

const request = require('supertest');
const app     = require('../src/app');

// Mock the entire @prisma/client module.
// This means prisma.note.create and prisma.note.findUnique never
// touch a real database — they return whatever we tell them to.
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    note: {
      create:     jest.fn(),
      findUnique: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrisma),
  };
});

// Get a reference to the mocked prisma instance so we can
// configure its return values inside each test.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ─────────────────────────────────────────────
// HAPPY PATH TESTS
// These test what happens when everything works correctly.
// ─────────────────────────────────────────────
describe('Happy Path', () => {

  test('POST /api/notes — creates a note and returns 201', async () => {
    // Arrange: tell the mock what prisma.note.create should return
    prisma.note.create.mockResolvedValue({
      id: 1,
      title: 'My First Note',
      content: 'Some content here',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Act: send the request
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'My First Note', content: 'Some content here' });

    // Assert
    // ❌ FLAW 2: Status code is wrong. POST that creates a resource
    //    should return 201 Created, not 200 OK.
    //    Fix: change 200 to 201.
    expect(res.statusCode).toBe(200);                    // ❌ should be 201
    expect(res.body).toHaveProperty('note');
    expect(res.body.note.title).toBe('My First Note');
  });

  test('GET /api/notes/:id — returns an existing note with 200', async () => {
    // Arrange
    prisma.note.findUnique.mockResolvedValue({
      id: 1,
      title: 'My First Note',
      content: 'Some content here',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Act
    const res = await request(app).get('/api/notes/1');

    // Assert
    expect(res.statusCode).toBe(200);

    // ❌ FLAW 3: Wrong response field. The endpoint wraps the note in
    //    { note: ... } but this test checks res.body.data.note.
    //    Fix: change res.body.data.note to res.body.note.
    expect(res.body.data.note.title).toBe('My First Note');  // ❌ wrong path
  });

});

// ─────────────────────────────────────────────
// FAILURE PATH TESTS
// These test what happens when things go wrong.
// ─────────────────────────────────────────────
describe('Failure Path', () => {

  test('GET /api/notes/:id — returns 404 when note does not exist', async () => {
    // ❌ FLAW 4: The mock for findUnique is NOT set up for this test.
    //    Without a mock return value, jest.fn() returns undefined by default.
    //    The endpoint receives undefined from prisma.note.findUnique,
    //    which is truthy enough to skip the null check and return 200
    //    with { note: undefined } instead of 404.
    //
    //    Fix: add this line before the request:
    //    prisma.note.findUnique.mockResolvedValue(null);

    const res = await request(app).get('/api/notes/9999');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Note not found');
  });

  test('POST /api/notes — returns error when title is missing', async () => {
    // Arrange: no mock needed — the endpoint should reject before hitting DB

    // Act
    const res = await request(app)
      .post('/api/notes')
      .send({ content: 'Content without a title' });

    // Assert
    // ❌ FLAW 5: Wrong expected status code. Missing required fields should
    //    return 422 Unprocessable Entity (the data was understood but invalid),
    //    not 400 Bad Request.
    //    Fix: change 400 to 422.
    //    Also fix: the endpoint in src/routes/notes.js needs validation added.
    expect(res.statusCode).toBe(400);                    // ❌ should be 422
    expect(res.body).toHaveProperty('message');
  });

});

// ─────────────────────────────────────────────
// EDGE CASE TESTS
// These test boundary conditions and unexpected inputs.
// ─────────────────────────────────────────────
describe('Edge Cases', () => {

  test('POST /api/notes — returns error when title is an empty string', async () => {
    // An empty string is not the same as a missing field.
    // The endpoint should reject '' just as it rejects undefined.

    const res = await request(app)
      .post('/api/notes')
      .send({ title: '', content: 'Content here' });

    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('message');
  });

  test('GET /api/notes/:id — returns 404 for non-numeric ID', async () => {
    // ❌ FLAW 6: The mock from a previous test is still set to return a note.
    //    Because beforeEach / afterEach mock resets are missing, the
    //    findUnique mock retains the return value from the happy path test
    //    and returns a note object instead of triggering an error.
    //
    //    Fix: add this block above the describe blocks:
    //
    //    beforeEach(() => {
    //      jest.clearAllMocks();
    //    });
    //
    //    This resets all mock return values before every test so they
    //    don't bleed into each other.

    const res = await request(app).get('/api/notes/not-a-number');

    // Number('not-a-number') is NaN. Prisma will throw a validation error.
    // The endpoint should handle this and return 404 or 400 — not 200.
    expect(res.statusCode).not.toBe(200);
  });

});
