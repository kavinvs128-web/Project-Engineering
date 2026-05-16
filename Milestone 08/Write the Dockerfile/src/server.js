require('dotenv').config();
const express = require('express');
const healthRoutes = require('./routes/healthRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/health', healthRoutes);
app.use('/api/shipments', shipmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
