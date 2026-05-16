const express = require('express');
const router = express.Router();
const { createUser, getUser, deleteUser, crashTest } = require('../user.controller');

router.post('/', createUser);
router.get('/crash/test', crashTest);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;