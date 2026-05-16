const express = require('express');
const router = express.Router();
const {
  createGroup,
  joinGroup,
  listUserGroups,
  getGroupDetails,
  getGroupEmails,
  sendGroupEmail
} = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, listUserGroups);
router.post('/', authMiddleware, createGroup);
router.post('/:groupId/join', authMiddleware, joinGroup);
router.get('/:groupId', authMiddleware, getGroupDetails);

module.exports = router;
