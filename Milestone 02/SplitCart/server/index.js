const express = require('express');
const cors = require('cors');
const cartState = require('./cartState');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET /cart - Get the current cart state, total, and split
app.get('/cart', (req, res) => {
  const total = cartState.items.reduce((sum, item) => sum + item.price, 0);
  const share = total / cartState.participants.length;
  
  res.json({
    ...cartState,
    total,
    share
  });
});

// POST /cart/item - Add item to cart
app.post('/cart/item', (req, res) => {
  const { name, price, addedBy } = req.body;
  const newItem = {
    id: Date.now().toString(),
    name,
    price: parseFloat(price) || 0,
    addedBy: addedBy || 'Unknown'
  };
  cartState.items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE /cart/item/:id - Remove item from cart
app.delete('/cart/item/:id', (req, res) => {
  const { id } = req.params;
  cartState.items = cartState.items.filter(item => item.id !== id);
  res.status(200).json({ message: 'Item removed' });
});

// POST /cart/pay - Confirm payment for a participant
app.post('/cart/pay', (req, res) => {
  const { participant, amount } = req.body;
  
  // Logical flaw: We don't check if the amount matches the *current* share.
  // We just record what they paid.
  cartState.payments.push({ participant, amount });
  
  // After payment, check if everyone has paid and if total is reached
  const totalPaid = cartState.payments.reduce((sum, p) => sum + p.amount, 0);
  const currentTotal = cartState.items.reduce((sum, item) => sum + item.price, 0);
  
  // Logical Check: If someone added items mid-payment, currentTotal > initial calculation.
  // Floating point flaw: totalPaid might be 9.99 while currentTotal is 10.00
  const isComplete = totalPaid >= currentTotal && cartState.payments.length === cartState.participants.length;

  res.json({ 
    success: true, 
    totalPaid, 
    currentTotal, 
    isComplete 
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
