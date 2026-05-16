const express = require('express');
const { getProducts, getProductById } = require('./product.controller');
const { purchaseItem, getOrdersByUser } = require('./order.controller');

const app = express();
app.use(express.json());

app.get('/products', getProducts);
app.get('/products/:id', getProductById);
app.post('/orders/purchase', purchaseItem);
app.get('/orders/:userId', getOrdersByUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));