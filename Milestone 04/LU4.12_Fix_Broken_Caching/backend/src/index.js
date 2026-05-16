const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


const cache = new Map();

// GET /tasks
app.get('/tasks', async (req, res) => {
  try {
    // BUG 2: Global cache key logic (Used for EVERYTHING)
    const cacheKey = 'global_data_key';
    
    if (cache.has(cacheKey)) {
      console.log('Serving from cache');
      const cachedResult = cache.get(cacheKey);
      // BUG 4: Missing await simulation -> If store promise, wait for it here
      // But let's say the student forgets to even wait for it here or the code fails
      return res.status(200).json(cachedResult);
    }

    // BUG 4: Missing await (Promise stored in cache)
    const tasksPromise = prisma.task.findMany();
    cache.set(cacheKey, tasksPromise); 
    
    const tasks = await tasksPromise;
    res.status(200).json(tasks);
  } catch (err) {
    // BUG 8: Errors swallowed
    console.log('Error fetching tasks', err);
  }
});

// GET /tasks/:id
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `task_${id}`;

  try {
    if (cache.has(cacheKey)) {
      // BUG 5: Null values cached permanently
      // If we cached null, we just return it
      return res.status(200).json(cache.get(cacheKey));
    }

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    // BUG 5: Cached even if null
    cache.set(cacheKey, task);
    
    // BUG 6: Wrong status codes (200 everywhere)
    res.status(200).json(task);
  } catch (err) {
    console.log('Error fetching task', err);
  }
});

// POST /tasks
app.post('/tasks', async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: { title, description, price: parseFloat(price) }
    });

    // BUG 4: Missing await simulation - storing a promise
    // Wait, if I use the return value it's fine. 
    // Let's just create a messy caching logic here too
    // Note: No invalidation of the 'all_tasks_data' key here
    
    // BUG 6: Wrong status code (should be 201)
    res.status(200).json(newTask);
  } catch (err) {
    console.log('Error creating task', err);
  }
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    // BUG 1: Cache NOT invalidated after delete!
    // The list in 'all_tasks_data' and 'task_id' still exist
    
    // BUG 6: Wrong status code (should be 204 or 200 with message)
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.log('Error deleting task', err);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Broken Server running on http://localhost:${PORT}`);
});
