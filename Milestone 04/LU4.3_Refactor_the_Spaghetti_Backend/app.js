const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// ============================================================
// 🍝 THE NIGHTMARE — Everything lives here. Good luck.
// ============================================================

// GET /users — Get all active users with their posts
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { isActive: true },
      include: { posts: true },
    });
    const formatted = users.map((u) => ({
      ...u,
      fullName: `${u.firstName} ${u.lastName}`,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /users/:id — Get a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { posts: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ ...user, fullName: `${user.firstName} ${user.lastName}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /users — Create a new user
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'firstName, lastName and email are required' });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already in use' });
    const user = await prisma.user.create({
      data: { firstName, lastName, email, isActive: true },
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /users/:id — Soft delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { isActive: false },
    });
    res.json({ message: 'User deactivated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /posts — Get all published posts with author
app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /posts/:id — Get a single post
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { author: true },
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /posts — Create a new post
app.post('/posts', async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !authorId) {
      return res.status(400).json({ error: 'title and authorId are required' });
    }
    const author = await prisma.user.findUnique({ where: { id: authorId } });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    const post = await prisma.post.create({
      data: { title, content, authorId, published: false },
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /posts/:id/publish — Publish a post
app.patch('/posts/:id/publish', async (req, res) => {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: { published: true },
    });
    res.json({ message: 'Post published', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
