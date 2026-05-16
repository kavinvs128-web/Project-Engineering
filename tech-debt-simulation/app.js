const express = require('express');
const app = express();

const { getAllUsers, saveUser } = require('./db');

app.use(express.json());

// ❌ Hardcoded secret
const DB_PASSWORD = "admin123";

// ❌ Bad design + no validation
app.post('/users', async (req, res) => {
  const user = req.body;

  if (!user.name) {
    res.send("Name missing"); // ❌ wrong response
  }

  user.createdAt = new Date();

  await saveUser(user);

  res.send(user);
});

// ❌ Inefficient logic
app.get('/users/:id', async (req, res) => {
  const users = await getAllUsers();

  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    res.send("User not found");
  }

  res.send(user);
});

// ❌ No error handling
app.get('/users', async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});

// TODO: Move routes to separate files (never done)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
