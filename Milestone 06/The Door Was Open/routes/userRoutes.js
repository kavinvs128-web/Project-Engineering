const express = require('express');
const router = express.Router();

/**
 * Vulnerable Routes: Missing Authentication Middleware
 * 
 * Student must find these and apply 'authenticate' middleware.
 */

// Private Route: Get User Profile
router.get('/profile', (req, res) => {
  // Vulnerability: No check for authentication
  res.status(200).json({ 
    user: { id: 101, username: 'student_tester', email: 'test@example.com' },
    message: 'Profile data retrieved.' 
  });
});

// Private Route: Update User Profile
router.put('/profile', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'bad_request', message: 'Email address is required.' });
  }
  
  res.status(200).json({ 
    message: 'User profile updated successfully!', 
    updatedUser: { id: 101, username: 'student_tester', email } 
  });
});

module.exports = router;
