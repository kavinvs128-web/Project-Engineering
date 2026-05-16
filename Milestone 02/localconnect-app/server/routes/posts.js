const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.get('/', postsController.getPosts);
router.post('/', postsController.createPost);

module.exports = router;
