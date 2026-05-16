
const jwt = require('jsonwebtoken');

// BROKEN PART 1: Hardcoded secret & no expiry
const SECRET = 'fragments-secret-key';

const signToken = (payload) => {
  // BROKEN PART 1: expiresIn not set
  return jwt.sign(payload, SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { signToken, verifyToken, SECRET };
