


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


router.get('/', listBlogs); 
router.get('/myblogs', protect, getMyBlogs); 
router.get('/:id', [param('id').isMongoId()], getBlog); 


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
