const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// const validateUser = require('../middleware/validateUser.middleware'); // TODO: Import this

// TODO: Inject validateUser middleware between the route and the controller
router.post('/', userController.createUser);

module.exports = router;