// Friday Deploy Disaster - six bugs live in this file.
//
// BUG 01 - Missing `await` on prisma.user.findUnique in getUser.
//   The call returns a Promise object, not the user record.
//   Fix it
//
// BUG 02 - createUser returns res.status(200) instead of 201.
//   POST that creates a resource must return 201 Created.
//   Fix it
//
// BUG 03 - getUser accesses user.name without checking for null.
//   If the ID does not exist, the server crashes with a TypeError.
//   Fix it
//
// BUG 04 - createUser has no input validation.
//   A request body missing `name` or `email` hits the database directly.
//   Fix it
//
// BUG 07 - The catch block in createUser logs the error and stops.
//   The request hangs until the client times out.
//   Fix it
//
// BUG 08 - Duplicate email (P2002) is not forwarded to the error handler.
//   The frontend never receives the 409 Conflict response.
//   Fix it

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const AppError = require('./utils/AppError');

const prisma = new PrismaClient();

// POST /users
async function createUser(req, res, next) {
  // BUG 04
  try {
    const user = await prisma.user.create({ data: req.body });
    // BUG 02
    res.status(200).json(user);
  } catch (error) {
    // BUG 07 & BUG 08
    console.log(error);
  }
}

// GET /users/:id
async function getUser(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    // BUG 01
    const user = prisma.user.findUnique({ where: { id } });
    
    // BUG 03
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
}

// DELETE /users/:id (This endpoint is correct as a reference)
async function deleteUser(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err); 
  }
}

router.post('/', createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;