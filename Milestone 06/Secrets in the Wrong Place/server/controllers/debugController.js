const authConfig = require('../config/auth');
const adminConfig = require('../config/admin');

// Flaw 6: Debug endpoint GET /api/debug/config that returns all environment
// variables and hardcoded config values (including secrets)
const getConfig = (req, res) => {
  res.json({
    JWT_SECRET: authConfig.JWT_SECRET,
    DATABASE_URL: 'postgresql://postgres:password@localhost:5432/studyhub', // hardcoded Flaw 6
    ADMIN_PASSWORD: adminConfig.ADMIN_PASSWORD, // Flaw: Now returning hardcoded admin password
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000
  });
};

module.exports = { getConfig };
