


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const blogRoutes = require('./routes/blogs');
// const { notFound, errorHandler } = require('./middleware/errorHandler');
// const path = require('path');

// const app = express();
// connectDB();

// // Configure helmet to allow cross-origin resource loading for uploads
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images to be loaded cross-origin
//   })
// );

// app.use(morgan('dev'));

// // CORS must come before static
// app.use(
//   cors({
//       origin: [
//       'http://localhost:3000', 
//       'http://localhost:5173',
//       'https://blog-two-eosin-74.vercel.app',
//        'https://blog-git-main-astech01s-projects.vercel.app',
//        'https://blog-j4hyqs179-astech01s-projects.vercel.app' // add your Vercel frontend
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Serve uploads with explicit CORS headers
// app.use(
//   '/uploads',
//   (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   },
//   express.static(path.join(__dirname, 'uploads'))
// );
// app.get('/', (req, res) => {
//   res.send('✅ Backend server is running!');
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);

// // Error handlers (after routes)
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { protect } = require('./middleware/authMiddleware');

const app = express();
connectDB();

// --- Security & Logging ---
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images to load cross-origin
  })
);
app.use(morgan('dev'));

// --- CORS ---
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://your-frontend.vercel.app', // replace with your Vercel URL
    ],
    credentials: true,
  })
);

// --- JSON Body Parser ---
app.use(express.json());

// --- Serve Uploads (public files) ---
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

// --- Serve Frontend Static Files (Vite build) ---
app.use(express.static(path.join(__dirname, 'public'))); // put your Vite build here

// --- API Routes ---
app.use('/api/auth', authRoutes);              // public routes
app.use('/api/blogs', protect, blogRoutes);   // protected routes

// --- Catch-all for React Router (SPA) ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- Error Handlers ---
app.use(notFound);
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
