// server.js
const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables

// Middleware
app.use(express.json()); // Parse JSON requests

// Example route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
