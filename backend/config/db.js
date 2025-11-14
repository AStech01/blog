// // config/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   const uri = process.env.MONGO_URI;
//   if (!uri) throw new Error('MONGO_URI not set in .env');
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 MongoDB connected');
  } catch (error) {
    console.error('MongoDB Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
