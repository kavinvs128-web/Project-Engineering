const express = require('express');
const router = express.Router();
const { doSomething } = require('../controllers/adminController');

// Flaw: New endpoint using hardcoded admin password check
router.post('/do-something', doSomething);

module.exports = router;
