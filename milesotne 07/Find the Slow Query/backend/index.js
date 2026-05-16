const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Root message
app.get('/', (req, res) => {
  res.json({ message: 'ShopLens Analytical API - Welcome to the Performance Lab' });
});

app.listen(PORT, () => {
  console.log(`--- ShopLens API Server Running on port ${PORT} ---`);
  console.log(`1. GET /api/products?category=electronics`);
  console.log(`2. GET /api/orders/recent`);
  console.log(`3. GET /api/users/:id/activity`);
});
