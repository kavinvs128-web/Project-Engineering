const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * 
 * Verifies the JWT token from the 'Authorization' header.
 * If valid, attaches the decoded user object to 'req.user'.
 * Otherwise, returns a 401 Unauthorized response.
 */
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: 'unauthorized', 
      message: 'Authentication required. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'unauthorized', 
      message: 'Invalid or expired token.' 
    });
  }
};

module.exports = authenticate;
