


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


app.use(
  helmet({
    crossOriginResourcePolicy: false, 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


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


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
