// ✅ MAIN SERVER FILE - Express application entry point
// Configures middleware, routes, database, and CORS

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// ✅ IMPORT ROUTES
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();

// ✅ SECURITY MIDDLEWARE
app.use(helmet());

// ✅ CORS - FIXED TO ALLOW FRONTEND
app.use(cors({
  origin: [
    'http://localhost:5173',           // Vite dev server
    'http://localhost:3000',           // Alternative port
    'https://your-vercel-app.vercel.app' // Add production URL later
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

// ✅ BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/favorites', favoriteRoutes);

// ✅ HEALTH CHECK
app.get('/api', (req, res) => {
  res.json({ message: 'Ethiopian Coffee & Tourism API is running' });
});

// ✅ ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ API available at: http://localhost:${PORT}/api`);
});

module.exports = app;