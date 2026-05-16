const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');

// Projects list
router.get('/', projectController.getProjects);

// Single project
router.get('/:id', projectController.getProject);

// Project tasks (Bottleneck #2)
router.get('/:id/tasks', taskController.getProjectTasks);

module.exports = router;
