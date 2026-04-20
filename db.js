const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/orderflow',
});

// Simple pool query wrapper to handle errors
module.exports = {
  query: (text, params) => pool.query(text, params),
};
