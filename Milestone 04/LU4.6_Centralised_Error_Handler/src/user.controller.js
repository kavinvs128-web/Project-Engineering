// src/user.controller.js
//
// KNOWN BUGS — do not fix these until you have built the safety net:
//
// Bug 1 — Inconsistent error shapes across three endpoints.
// Bug 2 — Duplicate email triggers a raw Prisma P2002 error.
// Bug 3 — deleteUser has no try/catch at all (Prisma P2025 crashes the app).
// Bug 4 — crashTest throws a raw Error that sends an HTML stack trace.

const prisma = require('./lib/db');

// POST /users
async function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    // 🚨 BUG 1: Inconsistent error shape. Returns { error: "..." }
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json(user);
  } catch (err) {
    // 🚨 BUG 1 & 2: Inconsistent shape AND it leaks raw Prisma errors (like P2002).
    res.status(500).json({ error: err.message });
  }
}

// GET /users/:id
async function getUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      // 🚨 BUG 1: Inconsistent error shape. Returns a plain text string!
      return res.status(404).send('Not found');
    }

    res.json(user);
  } catch (err) {
    // 🚨 BUG 1: It leaks raw Prisma errors
    res.status(500).json({ message: 'Something broke on the server' });
  }
}

// DELETE /users/:id
async function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  
  // 🚨 BUG 3: Missing try/catch block completely!
  await prisma.user.delete({ where: { id } });
  res.status(204).send();
}

// GET /users/crash/test
async function crashTest(req, res) {
  // 🚨 BUG 4: This intentionally throws an error to simulate a bug. Wrap this in a try/catch and use next(err).
  throw new Error('Simulated server crash!');
}

module.exports = { createUser, getUser, deleteUser, crashTest };