/**
 * Express server for Medical UI Project - Medication Tracker API
 */

const express = require('express');
const cors = require('cors');
const medicationRoutes = require('./routes/medications');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Medical UI Project API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api', medicationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Medical UI Project Backend Server is running`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api`);
  console.log(`\n✅ Server started successfully at ${new Date().toISOString()}\n`);
});

module.exports = app;

