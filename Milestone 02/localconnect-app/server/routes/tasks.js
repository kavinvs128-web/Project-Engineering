const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');

router.get('/', tasksController.getTasks);
router.post('/', tasksController.createTask);
router.patch('/:id', tasksController.updateTask);

module.exports = router;
