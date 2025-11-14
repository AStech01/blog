


const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, default: 'General' },
    coverImageUrl: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
