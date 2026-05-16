const express = require('express');
const router = express.Router();
const issuesController = require('../controllers/issues');

router.get('/', issuesController.getIssues);
router.post('/', issuesController.createIssue);
router.patch('/:id', issuesController.updateIssue);

module.exports = router;
