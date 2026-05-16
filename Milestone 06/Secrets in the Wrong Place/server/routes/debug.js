const express = require('express');
const router = express.Router();
const { getConfig } = require('../controllers/debugController');

// Flaw 6: Debug endpoint with no auth
router.get('/config', getConfig);

module.exports = router;
