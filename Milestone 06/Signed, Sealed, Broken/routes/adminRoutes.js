const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/adminController');

// ❌ Bug 4: Admin routes are completely unprotected
router.get('/admin/users', getAllUsers);             // ❌ no authMiddleware at all
router.delete('/admin/users/:id', deleteUser);       // ❌ no authMiddleware at all

module.exports = router;
