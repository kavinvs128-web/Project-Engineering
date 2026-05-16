import { Router } from 'express';
import { getAllPostsWithAuthors } from '../services/postService.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const posts = await getAllPostsWithAuthors();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
