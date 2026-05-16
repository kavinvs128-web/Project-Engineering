const { Pool } = require('pg');
require('dotenv').config();

// Pool configuration using DB_URL from environment variables
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

// Logs connection errors for debugging
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = {
  // Direct execution Helper
  query: (text, params) => pool.query(text, params),
};
