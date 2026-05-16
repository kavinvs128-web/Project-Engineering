
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const fragmentRoutes = require('./routes/fragments');

const app = express();
const PORT = 5001;

// BROKEN PART 5: CSRF vulnerability (no protection)
// CORS set to * (accepts requests from any origin)
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/fragments', fragmentRoutes);

app.get('/', (req, res) => {
  res.send('Fragments API Running (Insecure)');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
