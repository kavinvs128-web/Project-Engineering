const jwt = require('jsonwebtoken');

/**
 * verifyToken middleware
 *
 * Reads the Authorization header (Bearer <token>), verifies the JWT,
 * and attaches the decoded payload to req.user.
 *
 * Returns 401 if the header is missing or the token is invalid/expired.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info from token payload to the request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { verifyToken };
