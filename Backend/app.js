const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const macroRoutes = require('./routes/macroRoutes');
const config = require('./config');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API routes
app.use('/api/macros', macroRoutes);

// Serve static files from the frontend
const frontendPath = path.join(__dirname, '../Frontend/public');
console.log('Frontend path:', frontendPath);
app.use(express.static(frontendPath));

// Handle any other requests with the frontend's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const port = config.port || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
