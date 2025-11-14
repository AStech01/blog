// // middleware/upload.js
// const multer = require('multer');

// // store in memory and then upload to cloudinary
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith('image/')) {
//       cb(new Error('File must be an image'), false);
//     } else {
//       cb(null, true);
//     }
//   },
// });

// module.exports = upload;


// const multer = require('multer');

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith('image/')) {
//       cb(new Error('Only image files allowed'), false);
//     } else {
//       cb(null, true);
//     }
//   },
// });

// module.exports = upload;

// const multer = require('multer');
// const path = require('path');

// // Destination folder
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     // unique filename
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // Accept images only
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files allowed!'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files allowed'));
    }
  }
});

module.exports = upload;
