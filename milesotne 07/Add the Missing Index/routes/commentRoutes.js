const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// All comments are usually handled via tasks/projects,
// but we'll include it for standard structure.
router.get('/:taskId', commentController.getTaskComments);

module.exports = router;
