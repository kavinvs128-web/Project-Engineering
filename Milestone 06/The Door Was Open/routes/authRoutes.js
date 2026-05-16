const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Public Route: Register User
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'bad_request', message: 'All fields are required.' });
  }
  // Mock registration
  res.status(201).json({ message: 'User registered successfully!', user: { id: 101, username, email } });
});

// Public Route: Login User
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'bad_request', message: 'Username and password are required.' });
  }
  
  // Create mock token
  const token = jwt.sign({ id: 101, username, isAdmin: false }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful!', token });
});

module.exports = router;
