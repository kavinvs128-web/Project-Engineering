const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');
const scoreRoutes = require('./routes/score');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/score', scoreRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
