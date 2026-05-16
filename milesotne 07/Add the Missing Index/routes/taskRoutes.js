const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Tasks list (with potential assignedUserId filter)
router.get('/', taskController.getTasks);

// Single task details
router.get('/:id', taskController.getTaskById);

// Task comments (Bottleneck #3)
router.get('/:taskId/comments', commentController.getTaskComments);

// Add comment to task
router.post('/:taskId/comments', authMiddleware, commentController.addComment);

module.exports = router;
