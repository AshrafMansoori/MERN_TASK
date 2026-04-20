const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows your frontend to make requests to this API
app.use(express.json()); // Parses incoming JSON data from the frontend
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded data

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Task API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});