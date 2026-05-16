const express = require('express');
const router = express.Router();

// Private Route: User Posts
router.get('/my-posts', (req, res) => {
  // Vulnerability: No check for authentication
  res.status(200).json({ 
    posts: [
      { id: 1, title: 'My first post', content: 'This is a test post that should be private.' },
      { id: 2, title: 'Secret Post', content: 'This is another secret post.' },
    ], 
    message: 'Posts retrieved.' 
  });
});

// Private Route: Create a New Post
router.post('/create', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'bad_request', message: 'Title and content are required.' });
  }
  
  res.status(201).json({ 
    message: 'Post created successfully!', 
    post: { id: Date.now(), title, content } 
  });
});

module.exports = router;
