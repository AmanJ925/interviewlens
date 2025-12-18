require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Mount analyze route if exists
try {
  const analyzeRouter = require('./routes/analyze');
  app.use('/api/analyze', analyzeRouter);
} catch (e) {
  // If the route file is empty or does not export, skip mounting
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

