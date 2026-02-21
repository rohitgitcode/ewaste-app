const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('../config/database');

const depositRoutes = require('./routes/deposit');
const creditsRoutes = require('./routes/credits');
const marketplaceRoutes = require('./routes/marketplace');
const impactRoutes = require('./routes/impact');

const app = express();
const PORT = process.env.PORT || 5000;

// Try to connect to database, but continue even if it fails
connectDB().catch(err => {
  console.log('Database connection failed, running with mock data:', err.message);
});

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/deposit', depositRoutes);
app.use('/api/credits', creditsRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/impact', impactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.get('/api/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e8f5e9"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#4caf50" font-family="Arial" font-size="14">
        ${width}x${height}
      </text>
    </svg>
  `;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg.trim());
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
