require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api', productsRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ShopGrid API' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[ShopGrid] Backend running on http://localhost:${PORT}`);
});
