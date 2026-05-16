const { Pool } = require('pg');
require('dotenv').config();

/**
 * Database connection pool.
 * We use a single connection pool for the entire application to simplify 
 * configuration and ensure we stay within the database's connection limits.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
