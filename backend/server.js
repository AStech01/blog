require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const path = require('path');

const app = express();
connectDB();

// Configure helmet to allow cross-origin resource loading for uploads
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images to be loaded cross-origin
  })
);

app.use(morgan('dev'));

// --- CORS setup (replace previous cors block) ---
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://blog-sand-three-15.vercel.app',
  'https://blog-git-main-astech01s-projects.vercel.app',
  'https://blog-1b3n2duko-astech01s-projects.vercel.app'
  // add your other Vercel domains here (include https://)
];

// allow override from env (comma separated)
if (process.env.ALLOWED_ORIGINS) {
  const extras = process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean);
  allowedOrigins.push(...extras);
}

app.use((req, res, next) => {
  const origin = req.get('origin');
  // Allow requests with no origin (curl, server-to-server) or matching allowed origins
  if (!origin || allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
  } else {
    // Optional: for debugging, respond with a 403 for unknown origins
    // return res.status(403).send('CORS origin denied');
  }
  next();
});

// also register app.options for all routes
app.options('*', (req, res) => res.sendStatus(204));

// Serve uploads with explicit CORS headers
app.use(
  '/uploads',
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  },
  express.static(path.join(__dirname, 'uploads'))
);
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Error handlers (after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
