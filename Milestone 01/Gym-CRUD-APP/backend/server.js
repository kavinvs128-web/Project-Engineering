const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database('database.db');

db.prepare(`
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  exercise TEXT,
  weight INTEGER,
  reps INTEGER,
  date TEXT
)
`).run();

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create
app.post('/items', (req, res) => {
  const { exercise, weight, reps, date } = req.body;
  const result = db.prepare(
    "INSERT INTO items (exercise, weight, reps, date) VALUES (?, ?, ?, ?)"
  ).run(exercise, weight, reps, date);

  res.json({ id: result.lastInsertRowid, exercise, weight, reps, date });
});

// Read
app.get('/items', (req, res) => {
  const items = db.prepare("SELECT * FROM items").all();
  res.json(items);
});

// Update
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { exercise, weight, reps, date } = req.body;

  db.prepare(
    "UPDATE items SET exercise=?, weight=?, reps=?, date=? WHERE id=?"
  ).run(exercise, weight, reps, date, id);

  res.json({ message: "Updated" });
});

// Delete
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;

  db.prepare("DELETE FROM items WHERE id=?").run(id);

  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
