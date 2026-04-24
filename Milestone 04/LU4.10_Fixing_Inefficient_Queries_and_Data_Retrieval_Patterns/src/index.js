import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './products/product.route.js';
import orderRoutes from './orders/order.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount the modular routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Nexus API running at http://localhost:${PORT}`);
});