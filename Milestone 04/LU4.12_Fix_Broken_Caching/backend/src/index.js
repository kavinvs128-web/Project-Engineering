const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Better cache (still Map, but used correctly)
const cache = new Map();

// ✅ Cache helpers
const CACHE_TTL = 60 * 1000; // 60 seconds

const setCache = (key, value) => {
  cache.set(key, {
    data: value,
    expiry: Date.now() + CACHE_TTL
  });
};

const getCache = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }

  return entry.data;
};

const deleteCache = (key) => {
  cache.delete(key);
};

// ✅ Namespaced keys
const TASK_LIST_KEY = 'tasks:list';
const TASK_KEY = (id) => `task:${id}`;

// =======================
// GET /tasks
// =======================
app.get('/tasks', async (req, res) => {
  try {
    const cached = getCache(TASK_LIST_KEY);

    if (cached) {
      console.log('Serving tasks from cache');
      return res.status(200).json(cached);
    }

    const tasks = await prisma.task.findMany();

    // ✅ Only cache valid data
    if (tasks) {
      setCache(TASK_LIST_KEY, tasks);
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =======================
// GET /tasks/:id
// =======================
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const key = TASK_KEY(id);

  try {
    const cached = getCache(key);

    if (cached) {
      console.log('Serving task from cache');
      return res.status(200).json(cached);
    }

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    setCache(key, task);

    res.status(200).json(task);
  } catch (err) {
    console.error('Error fetching task', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =======================
// POST /tasks
// =======================
app.post('/tasks', async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        price: parseFloat(price)
      }
    });

    // ✅ Invalidate task list cache
    deleteCache(TASK_LIST_KEY);

    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =======================
// DELETE /tasks/:id
// =======================
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    // ✅ Invalidate caches
    deleteCache(TASK_KEY(id));
    deleteCache(TASK_LIST_KEY);

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Fixed Server running on http://localhost:${PORT}`);
});