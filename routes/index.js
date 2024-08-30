const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const thoughtRoutes = require('./routes/thoughts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB connected successfully');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
  });
  
  // Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });