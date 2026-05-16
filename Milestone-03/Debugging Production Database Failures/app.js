const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Import routes
const customersRoutes = require('./routes/customers');
const ordersRoutes = require('./routes/orders');
const orderItemsRoutes = require('./routes/order_items');
const paymentsRoutes = require('./routes/payments');
const productsRoutes = require('./routes/products');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to OrderFlow API! Use the routes /customers, /orders, /order_items, /payments, and /products to interact with the system.',
    version: '1.0.0',
    stats: 'Everything is running smoothly (sort of!)'
  });
});

// Register routes
app.use('/customers', customersRoutes);
app.use('/orders', ordersRoutes);
app.use('/order_items', orderItemsRoutes);
app.use('/payments', paymentsRoutes);
app.use('/products', productsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`OrderFlow API listening at http://localhost:${port}`);
});

module.exports = app;
