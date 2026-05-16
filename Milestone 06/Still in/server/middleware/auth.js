const { verifyToken } = require("../auth/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    // INTENTIONAL MISHANDLING FOR STUDENT TO FIX
    // It captures all errors (including expiry) and returns 500
    // Should return 401 for TokenExpiredError
    res.status(500).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = authMiddleware;
