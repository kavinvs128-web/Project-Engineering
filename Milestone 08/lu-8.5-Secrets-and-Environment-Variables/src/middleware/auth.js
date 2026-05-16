// src/middleware/auth.js
// JWT authentication middleware

const jwt = require("jsonwebtoken");

// ============================================================
// BUG: The JWT secret is HARDCODED. In production, this means:
//   1. Anyone who reads the source code knows the secret.
//   2. Tokens signed locally won't match if the prod secret
//      is different (or missing entirely).
// ============================================================

const JWT_SECRET = "super-secret-key-123";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = { authenticate, JWT_SECRET };
