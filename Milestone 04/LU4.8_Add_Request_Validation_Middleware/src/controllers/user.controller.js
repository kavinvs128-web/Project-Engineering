const userService = require('../services/user.service');

async function createUser(req, res, next) {
  try {
    // Blind trust — whatever arrived in req.body goes straight to the service
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser };