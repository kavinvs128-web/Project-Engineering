const express = require('express');
const router = express.Router();

// Private Route: Admin List Users
router.get('/users', (req, res) => {
  // Vulnerability: No check for authentication
  res.status(200).json({ 
    users: [
      { id: 1, username: 'admin', email: 'admin@example.com' },
      { id: 101, username: 'student_tester', email: 'test@example.com' },
      { id: 102, username: 'another_user', email: 'user@example.com' },
    ], 
    message: 'All user data retrieved.' 
  });
});

// Private Route: Admin Delete User
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  // Vulnerability: No check for authentication
  res.status(200).json({ 
    message: `User with id ${id} deleted successfully!`, 
    deletedUserId: id 
  });
});

module.exports = router;
