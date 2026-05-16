const express = require('express');
const dotenv = require('dotenv');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');
const orderItemsRouter = require('./routes/order_items');
const paymentsRouter = require('./routes/payments');
const productsRouter = require('./routes/products');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Main App Routes
app.use('/customers', customersRouter);
app.use('/orders', ordersRouter);
app.use('/order_items', orderItemsRouter);
app.use('/payments', paymentsRouter);
app.use('/products', productsRouter);

// Basic health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to OrderFlow API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`OrderFlow API server running on port ${port}`);
});

module.exports = app;
