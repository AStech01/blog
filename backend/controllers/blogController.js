const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');
const path = require('path');


exports.createBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    console.log('createBlog - req.file:', req.file);
    const { title, description, category } = req.body;
    const userId = req.user && (req.user._id || req.user.id);
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    let coverImageUrl;
    if (req.file && req.file.filename) {
      coverImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const blog = new Blog({
      title,
      description,
      category: category || 'General',
      author: userId,
      ...(coverImageUrl ? { coverImageUrl } : {}),
    });

    await blog.save();
    return res.status(201).json(blog);
  } catch (err) {
    console.error('createBlog error:', err);
    return res.status(500).json({ message: err.message });
  }
};


exports.listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    return res.json(blogs);
  } catch (err) {
    console.error('listBlogs error:', err);
    return res.status(500).json({ message: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    return res.json(blog);
  } catch (err) {
    console.error('getBlog error:', err);
    return res.status(500).json({ message: err.message });
  }
};


exports.getMyBlogs = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: 'Not authorized' });

    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    return res.json(blogs);
  } catch (err) {
    console.error('getMyBlogs error:', err);
    return res.status(500).json({ message: err.message });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    console.log('updateBlog - req.file:', req.file);
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const userId = req.user && (req.user._id || req.user.id);
    if (String(blog.author) !== String(userId)) return res.status(403).json({ message: 'Not authorized' });

    const { title, description, category, coverImageUrl } = req.body;
    if (title !== undefined) blog.title = title;
    if (description !== undefined) blog.description = description;
    if (category !== undefined) blog.category = category;

    if (req.file && req.file.filename) {
      blog.coverImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    } else if (typeof coverImageUrl !== 'undefined') {
     
      blog.coverImageUrl = coverImageUrl || blog.coverImageUrl;
    }

    await blog.save();
    return res.json(blog);
  } catch (err) {
    console.error('updateBlog error:', err);
    return res.status(500).json({ message: err.message });
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    const userId = (req.user && (req.user.id || req.user._id)) || req.user;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    

    if (blog.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    return res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("deleteBlog error:", err);
    return res.status(500).json({ message: err.message });
  }
};
