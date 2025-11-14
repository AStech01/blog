
const Blog = require('../models/Blog');

async function authorizeAuthor(req, res, next) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Not found' });
  if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  req.blog = blog;
  next();
}

module.exports = authorizeAuthor;
