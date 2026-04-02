const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS to allow frontend to talk to backend
const helmet = require('helmet'); // Import Helmet for security headers
const rateLimit = require('express-rate-limit'); // Import Rate Limiting
const xss = require('xss-clean'); // Import XSS sanitization
const authRoutes = require('./routes/authRoutes'); // Import auth routes
require('dotenv').config(); // Load .env variables into process.env

const app = express(); // Initialize Express app

// Security Middleware
app.use(helmet()); // Sets secure HTTP headers to hide server info
app.use(cors()); // Allows requests from your React frontend (Cross-Origin)
app.use(xss()); // Cleans user input from malicious scripts

// Rate Limiting (Prevent brute force attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100 // Limit each IP to 100 requests per window
});
app.use('/api', limiter); // Apply limit to API routes

app.use(express.json()); // Allows app to accept JSON data in request bodies

// Routes
app.use('/api/auth', authRoutes); // Mount auth routes at /api/auth

// Start Server
const PORT = process.env.PORT || 5000; // Get port from .env or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log success message
});