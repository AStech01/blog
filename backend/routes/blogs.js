// const express = require('express');
// const { body, param } = require('express-validator');
// const { protect } = require('../middleware/auth');
// const upload = require('../middleware/upload');
// const {
//   listBlogs,
//   getBlog,
//   getMyBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } = require('../controllers/blogController');

// const router = express.Router();

// // 🟢 Public routes
// router.get('/', listBlogs);                  // All published blogs
// router.get('/:id', [param('id').isMongoId()], getBlog); // Single blog by ID

// // 🟠 Protected routes (login required)
// router.get('/myblogs', protect, getMyBlogs); // Only blogs of logged-in user

// router.post(
//   '/',
//   protect,
//   upload.single('coverImage'),
//   [
//     body('title').notEmpty().withMessage('Title is required'),
//     body('description').notEmpty().withMessage('Description is required'),
//   ],
//   createBlog
// );

// router.put(
//   '/:id',
//   protect,
//   upload.single('coverImage'),
//   [param('id').isMongoId()],
//   updateBlog
// );

// router.delete('/:id', protect, [param('id').isMongoId()], deleteBlog);

// module.exports = router;


// const express = require('express');
// const { body, param } = require('express-validator');
// const { protect } = require('../middleware/auth');
// const upload = require('../middleware/upload'); // Multer or your file middleware
// const {
//   listBlogs,
//   getBlog,
//   getMyBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } = require('../controllers/blogController');

// const router = express.Router();

// // ✅ Public routes
// router.get('/', listBlogs); // All public blogs
// router.get('/:id', [param('id').isMongoId()], getBlog); // Single blog

// // ✅ Protected routes
// router.get('/myblogs', protect, getMyBlogs); // Only logged-in user's blogs

// router.post(
//   '/',
//   protect,
//   upload.single('coverImage'),
//   [
//     body('title').notEmpty().withMessage('Title required'),
//     body('description').notEmpty().withMessage('Description required'),
//   ],
//   createBlog
// );

// router.put(
//   '/:id',
//   protect,
//   upload.single('coverImage'),
//   [param('id').isMongoId()],
//   updateBlog
// );

// router.delete('/:id', protect, [param('id').isMongoId()], deleteBlog);

// module.exports = router;


// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const { protect } = require('../middleware/auth');
// const upload = require('../middleware/upload');
// const {
//   listBlogs,
//   getBlog,
//   getMyBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } = require('../controllers/blogController');

// const router = express.Router();

// // ----------------------
// // Public routes
// // ----------------------
// router.get('/', listBlogs); // Get all blogs

// // ----------------------
// // Protected routes
// // ----------------------
// router.get('/myblogs', protect, getMyBlogs); // Logged-in user's blogs

// // Single blog by ID
// router.get('/:id', protect, async (req, res, next) => {
//   const id = req.params.id;
//   if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//     return res.status(400).json({ message: 'Invalid blog ID' });
//   }
//   next();
// }, getBlog);

// // Create blog
// router.post(
//   '/',
//   protect,
//   upload.single('coverImage'),
//   [
//     body('title').notEmpty().withMessage('Title required'),
//     body('description').notEmpty().withMessage('Description required'),
//   ],
//   createBlog
// );

// // Update blog
// router.put('/:id', protect, upload.single('coverImage'), async (req, res, next) => {
//   const id = req.params.id;
//   if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//     return res.status(400).json({ message: 'Invalid blog ID' });
//   }
//   next();
// }, updateBlog);

// // Delete blog
// router.delete('/:id', protect, async (req, res, next) => {
//   const id = req.params.id;
//   if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//     return res.status(400).json({ message: 'Invalid blog ID' });
//   }
//   next();
// }, deleteBlog);

// module.exports = router;


// const express = require('express');
// const { body, param } = require('express-validator');
// const { protect } = require('../middleware/auth');
// const upload = require('../middleware/upload'); // multer
// const {
//   listBlogs,
//   getBlog,
//   getMyBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } = require('../controllers/blogController');

// const router = express.Router();

// // Public
// router.get('/', listBlogs); // All blogs
// router.get('/:id', param('id').isMongoId(), getBlog);

// // Protected
// router.get('/myblogs', protect, getMyBlogs); // Must be BEFORE /:id
// router.post(
//   '/',
//   protect,
//   upload.single('coverImage'),
//   [
//     body('title').notEmpty().withMessage('Title required'),
//     body('description').notEmpty().withMessage('Description required'),
//   ],
//   createBlog
// );
// router.put('/:id', protect, upload.single('coverImage'), param('id').isMongoId(), updateBlog);
// router.delete('/:id', protect, param('id').isMongoId(), deleteBlog);

// module.exports = router;

// const express = require('express');
// const { body, param } = require('express-validator');
// const { protect } = require('../middleware/auth');
// const upload = require('../middleware/upload');
// const {
//   listBlogs,
//   getBlog,
//   getMyBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } = require('../controllers/blogController');

// const router = express.Router();

// // Public
// router.get('/', listBlogs);

// // Protected
// router.get('/myblogs', protect, getMyBlogs);

// // Create blog
// router.post(
//   '/',
//   protect,
//   upload.single('coverImage'),
//   [body('title').notEmpty(), body('description').notEmpty()],
//   createBlog
// );

// // Update blog
// router.put('/:id', protect, upload.single('coverImage'), [param('id').isMongoId()], updateBlog);

// // Delete blog
// router.delete('/:id', protect, [param('id').isMongoId()], deleteBlog);

// // Single blog by ID (public)
// router.get('/:id', [param('id').isMongoId()], getBlog);

// module.exports = router;


const express = require('express');
const { body, param } = require('express-validator');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  listBlogs,
  getBlog,
  getMyBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const router = express.Router();

// ----------------------
// Public routes
// ----------------------
router.get('/', listBlogs); // All blogs
router.get('/myblogs', protect, getMyBlogs); // User's blogs (protected) -> put BEFORE /:id
router.get('/:id', [param('id').isMongoId()], getBlog); // Single blog

// ----------------------
// Protected routes
// ----------------------
router.post(
  '/',
  protect,
  upload.single('coverImage'),
  [
    body('title').notEmpty().withMessage('Title required'),
    body('description').notEmpty().withMessage('Description required')
  ],
  createBlog
);


router.put('/:id', protect, upload.single('coverImage'), [param('id').isMongoId()], updateBlog);
router.delete('/:id', protect, [param('id').isMongoId()], deleteBlog);

module.exports = router;
