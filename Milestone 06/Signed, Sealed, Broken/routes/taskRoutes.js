const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { 
    getTasks, 
    createTask, 
    getTaskById, 
    updateTask, 
    deleteTask 
} = require('../controllers/taskController');

// ❌ Bug 4: Missing middleware on specific routes
router.get('/tasks', authMiddleware, getTasks);      // ✅ protected
router.post('/tasks', authMiddleware, createTask);   // ✅ protected
router.put('/tasks/:id', authMiddleware, updateTask); // ✅ protected
router.get('/tasks/:id', getTaskById);               // ❌ missing authMiddleware
router.delete('/tasks/:id', deleteTask);             // ❌ missing authMiddleware

module.exports = router;
