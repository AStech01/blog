// // require('dotenv').config();
// // const express = require('express');
// // const cors = require('cors');
// // const helmet = require('helmet');
// // const morgan = require('morgan');
// // const rateLimit = require('express-rate-limit');
// // const connectDB = require('./config/db');
// // const authRoutes = require('./routes/auth');
// // const blogRoutes = require('./routes/blogs');
// // const { notFound, errorHandler } = require('./middleware/errorHandler');

// // const app = express();
// // connectDB();

// // // Middleware
// // app.use(helmet());
// // app.use(cors());
// // app.use(express.json());
// // app.use(morgan('dev'));

// // // Rate limiter
// // const limiter = rateLimit({
// //   windowMs: 15 * 60 * 1000,
// //   max: 200,
// // });
// // app.use(limiter);

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/blogs', blogRoutes);

// // // 404 & Error Handler
// // app.use(notFound);
// // app.use(errorHandler);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const blogRoutes = require('./routes/blogs');
// const { notFound, errorHandler } = require('./middleware/errorHandler');
// const path = require('path');
// const app = express();
// connectDB();

// // // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(helmet());
// app.use(morgan('dev'));

// // app.use(
// //   rateLimit({
// //     windowMs: 15 * 60 * 1000,
// //     max: 200,
// //   })
// // );

// // // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/blogs', blogRoutes);

// // // Error handlers
// app.use(notFound);
// app.use(errorHandler);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
// require('dotenv').config();



// app.use(express.json());

// // CORS MUST come before static routes
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:5173'],
//   credentials: true
// }));

// // Now serve uploads
// // app.use('/uploads', express.static('uploads', {
// //   setHeaders: (res) => {
// //     res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
// //   },
// // }));
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


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

// CORS must come before static
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());

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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Error handlers (after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
