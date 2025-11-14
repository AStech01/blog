


// // // require('dotenv').config();
// // // const express = require('express');
// // // const cors = require('cors');
// // // const morgan = require('morgan');
// // // const helmet = require('helmet');
// // // const connectDB = require('./config/db');
// // // const authRoutes = require('./routes/auth');
// // // const blogRoutes = require('./routes/blogs');
// // // const { notFound, errorHandler } = require('./middleware/errorHandler');
// // // const path = require('path');

// // // const app = express();
// // // connectDB();

// // // // Configure helmet to allow cross-origin resource loading for uploads
// // // app.use(
// // //   helmet({
// // //     crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images to be loaded cross-origin
// // //   })
// // // );

// // // app.use(morgan('dev'));

// // // // CORS must come before static
// // // app.use(
// // //   cors({
// // //       origin: [
// // //       'http://localhost:3000', 
// // //       'http://localhost:5173',
// // //       'https://blog-sand-three-15.vercel.app' // add your Vercel frontend
// // //     ],
// // //     credentials: true,
// // //     methods: ["GET", "POST", "PUT", "DELETE"],
// // //     allowedHeaders: ["Content-Type", "Authorization"]
// // //   })
// // // );

// // // app.use(express.json());

// // // // Serve uploads with explicit CORS headers
// // // app.use(
// // //   '/uploads',
// // //   (req, res, next) => {
// // //     res.header('Access-Control-Allow-Origin', '*');
// // //     res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
// // //     res.header('Access-Control-Allow-Headers', 'Content-Type');
// // //     next();
// // //   },
// // //   express.static(path.join(__dirname, 'uploads'))
// // // );
// // // app.get('/', (req, res) => {
// // //   res.send('✅ Backend server is running!');
// // // });

// // // // Routes
// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/blogs', blogRoutes);

// // // // Error handlers (after routes)
// // // app.use(notFound);
// // // app.use(errorHandler);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


// // // require('dotenv').config();
// // // const express = require('express');
// // // const cors = require('cors');
// // // const morgan = require('morgan');
// // // const helmet = require('helmet');
// // // const connectDB = require('./config/db');
// // // const authRoutes = require('./routes/auth');
// // // const blogRoutes = require('./routes/blogs');
// // // const { notFound, errorHandler } = require('./middleware/errorHandler');
// // // const path = require('path');

// // // const app = express();
// // // connectDB();

// // // // Helmet Config
// // // app.use(
// // //   helmet({
// // //     crossOriginResourcePolicy: { policy: 'cross-origin' },
// // //   })
// // // );

// // // app.use(morgan('dev'));

// // // // ⭐ FIXED CORS — MUST BE BEFORE ROUTES & STATIC ⭐
// // // app.use(
// // //   cors({
// // //     origin: [
// // //       'http://localhost:3000',
// // //       'http://localhost:5173',
// // //       'https://blog-git-main-astech01s-projects.vercel.app',
// // //       'https://blog-sand-three-15.vercel.app'
// // //     ],
// // //     credentials: true,
// // //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // //     allowedHeaders: ['Content-Type', 'Authorization']
// // //   })
// // // );

// // // // ⭐ FIXED OPTIONS for Express v5 ⭐


// // // app.use(express.json());

// // // // Serve uploads
// // // app.use(
// // //   '/uploads',
// // //   (req, res, next) => {
// // //     res.header('Access-Control-Allow-Origin', '*');
// // //     res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
// // //     res.header('Access-Control-Allow-Headers', 'Content-Type');
// // //     next();
// // //   },
// // //   express.static(path.join(__dirname, 'uploads'))
// // // );

// // // // Base route
// // // app.get('/', (req, res) => {
// // //   res.send('✅ Backend server is running!');
// // // });

// // // // API Routes
// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/blogs', blogRoutes);

// // // // Error handlers
// // // app.use(notFound);
// // // app.use(errorHandler);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
// // // require('dotenv').config();
// // // const express = require('express');
// // // const cors = require('cors');
// // // const morgan = require('morgan');
// // // const helmet = require('helmet');
// // // const connectDB = require('./config/db');
// // // const authRoutes = require('./routes/auth');
// // // const blogRoutes = require('./routes/blogs');
// // // const { notFound, errorHandler } = require('./middleware/errorHandler');
// // // const path = require('path');

// // // const app = express();
// // // connectDB();

// // // // FIRST → Body parsing
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Helmet
// // // app.use(
// // //   helmet({
// // //     crossOriginResourcePolicy: { policy: 'cross-origin' },
// // //   })
// // // );

// // // app.use(morgan('dev'));

// // // // GLOBAL CORS
// // // app.use(
// // //   cors({
// // //     origin: [
// // //       'http://localhost:5173',
// // //       'http://localhost:3000',
// // //       'https://blog-sand-three-15.vercel.app',
// // //       'https://blog-git-main-astech01s-projects.vercel.app'
// // //     ],
// // //     credentials: true,
// // //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // //     allowedHeaders: ['Content-Type', 'Authorization']
// // //   })
// // // );
// // // app.use(cors(corsOptions));    // MUST BE FIRST
// // // app.use(express.json()); 

// // // // Preflight


// // // // Uploads folder
// // // app.use(
// // //   '/uploads',
// // //   (req, res, next) => {
// // //     res.header('Access-Control-Allow-Origin', '*');
// // //     next();
// // //   },
// // //   express.static(path.join(__dirname, 'uploads'))
// // // );

// // // // Routes
// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/blogs', blogRoutes);

// // // // Error handlers
// // // app.use(notFound);
// // // app.use(errorHandler);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`Server running on ${PORT}`));


// // // require('dotenv').config();
// // // const express = require('express');
// // // const cors = require('cors');
// // // const morgan = require('morgan');
// // // const helmet = require('helmet');
// // // const connectDB = require('./config/db');
// // // const authRoutes = require('./routes/auth');
// // // const blogRoutes = require('./routes/blogs');
// // // const { notFound, errorHandler } = require('./middleware/errorHandler');
// // // const path = require('path');

// // // const app = express();
// // // connectDB();

// // // // Body parsing
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));

// // // // Helmet
// // // app.use(
// // //   helmet({
// // //     crossOriginResourcePolicy: { policy: 'cross-origin' },
// // //   })
// // // );

// // // // Morgan
// // // app.use(morgan('dev'));

// // // // ------------------------------------
// // // // CORS (ONLY ONCE & CORRECT)
// // // // ------------------------------------
// // // const allowedOrigins = [
// // //   'http://localhost:5173',
// // //   'http://localhost:3000',
// // //   'https://blog-sand-three-15.vercel.app',
// // //   'https://blog-git-main-astech01s-projects.vercel.app'
// // // ];

// // // app.use(
// // //   cors({
// // //     origin: allowedOrigins,
// // //     credentials: true,
// // //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// // //     allowedHeaders: ['Content-Type', 'Authorization'],
// // //   })
// // // );

// // // // ------------------------------------
// // // // Static uploads folder
// // // // ------------------------------------
// // // app.use(
// // //   '/uploads',
// // //   (req, res, next) => {
// // //     res.header('Access-Control-Allow-Origin', '*');
// // //     next();
// // //   },
// // //   express.static(path.join(__dirname, 'uploads'))
// // // );

// // // // ------------------------------------
// // // // Routes
// // // // ------------------------------------
// // // app.use('/api/auth', authRoutes);
// // // app.use('/api/blogs', blogRoutes);

// // // // Error handlers
// // // app.use(notFound);
// // // app.use(errorHandler);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => console.log(`Server running on ${PORT}`));


// // require('dotenv').config();
// // const express = require('express');
// // const cors = require('cors');
// // const morgan = require('morgan');
// // const helmet = require('helmet');
// // const connectDB = require('./config/db');
// // const authRoutes = require('./routes/auth');
// // const blogRoutes = require('./routes/blogs');
// // const { notFound, errorHandler } = require('./middleware/errorHandler');
// // const path = require('path');

// // const app = express();
// // connectDB();

// // // -----------------------
// // // Middleware
// // // -----------------------
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // app.use(
// //   helmet({
// //     crossOriginResourcePolicy: { policy: 'cross-origin' },
// //   })
// // );

// // app.use(morgan('dev'));

// // // -----------------------
// // // CORS (ONLY ONE TIME)
// // // -----------------------
// // const allowedOrigins = [
// //   'http://localhost:5173',
// //   'http://localhost:3000',
// //   'https://blog-sand-three-15.vercel.app',
// //   'https://blog-git-main-astech01s-projects.vercel.app'
// // ];

// // app.use(
// //   cors({
// //     origin: function (origin, callback) {
// //       if (!origin || allowedOrigins.includes(origin)) {
// //         callback(null, origin);
// //       } else {
// //         callback(new Error("CORS not allowed for this origin: " + origin));
// //       }
// //     },
// //     credentials: true,
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     allowedHeaders: ['Content-Type', 'Authorization'],
// //   })
// // );

// // // Fix preflight

// // // -----------------------
// // // Static uploads folder
// // // -----------------------
// // app.use(
// //   '/uploads',
// //   (req, res, next) => {
// //     res.header('Access-Control-Allow-Origin', '*');
// //     next();
// //   },
// //   express.static(path.join(__dirname, 'uploads'))
// // );

// // // -----------------------
// // // Routes
// // // -----------------------
// // app.use('/api/auth', authRoutes);
// // app.use('/api/blogs', blogRoutes);

// // // -----------------------
// // // Error Handlers
// // // -----------------------
// // app.use(notFound);
// // app.use(errorHandler);

// // // -----------------------
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const helmet = require("helmet");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/auth");
// const blogRoutes = require("./routes/blogs");
// const { notFound, errorHandler } = require("./middleware/errorHandler");
// const path = require("path");

// const app = express();
// connectDB();


// // -----------------------
// // Core Middleware
// // -----------------------
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//   })
// );

// app.use(morgan("dev"));

// // -----------------------
// // FIXED CORS – BEST PRACTICE
// // -----------------------
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
//   "https://blog-sand-three-15.vercel.app",
//   "https://blog-git-main-astech01s-projects.vercel.app",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   if (req.method === "OPTIONS") return res.sendStatus(204);
//   next();
// });
// // Preflight (global)

// // -----------------------
// // Static uploads folder
// // -----------------------
// app.use(
//   "/uploads",
//   (req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     next();
//   },
//   express.static(path.join(__dirname, "uploads"))
// );

// // -----------------------
// // Routes
// // -----------------------
// app.use("/api/auth", authRoutes);
// app.use("/api/blogs", blogRoutes);

// // -----------------------
// // Error handlers
// // -----------------------
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
connectDB();

// -----------------------
// Security + Core
// -----------------------
app.use(
  helmet({
    crossOriginResourcePolicy: false, // allow images from cross-origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// -----------------------
// CORS (ONLY THIS! No duplicates)
// -----------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-3pxf.onrender.com",
  "https://blog-sand-three-15.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight

// -----------------------
// Static files
// -----------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -----------------------
// Routes
// -----------------------
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// -----------------------
// Error handlers
// -----------------------
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
