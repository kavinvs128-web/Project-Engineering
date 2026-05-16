const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/groups');
const debugRoutes = require('./routes/debug');
const adminRoutes = require('./routes/admin');
const noteRoutes = require('./routes/notes');

const app = express();
const PORT = 5000;

// Flaw 5: CORS middleware set to origin: true (allows ALL origins)
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// Use logging middleware (Flaw 10)
app.use(logger);

// Flaw 11: No validation of environment variables – application starts even
// if secrets are missing because they are hardcoded throughout.

// Mounting routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/debug', debugRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Study Group Hub API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
