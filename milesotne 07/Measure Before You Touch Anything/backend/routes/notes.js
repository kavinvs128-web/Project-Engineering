const express = require('express');
const router = express.Router();
const { getNotes, createNote } = require('../controllers/noteController');

router.route('/:taskId').get(getNotes);
router.route('/').post(createNote);

module.exports = router;
