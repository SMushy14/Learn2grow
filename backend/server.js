// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allows your React frontend to communicate with this API
app.use(express.json()); // Allows Express to parse incoming JSON data in request bodies

// A simple test route to verify the server is running
app.get('/api/status', (req, res) => {
  res.status(200).json({ message: 'Rwandan Learning Platform API is running!' });
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});