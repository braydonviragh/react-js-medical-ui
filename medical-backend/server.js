/**
 * Express server for Medical UI Project - Medication Tracker API
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const medicationRoutes = require('./routes/medications');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;

// Determine if we're in production (serving built React app)
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;

// CORS configuration - only needed in development when frontend runs separately
if (!isProduction) {
  const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build in production
if (isProduction) {
  const frontendBuildPath = path.join(__dirname, '../medical-frontend/build');
  app.use(express.static(frontendBuildPath));
  console.log(`📦 Serving React app from: ${frontendBuildPath}`);
}

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

// In production, serve React app for all non-API routes (supports React Router)
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../medical-frontend/build', 'index.html'));
  });
} else {
  // In development, return 404 for non-API routes
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Route not found'
    });
  });
}

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

