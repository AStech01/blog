const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Blog = require('../models/Blog');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Find blogs with 'undefined' in coverImageUrl and clear or update them.
    const res = await Blog.updateMany(
      { coverImageUrl: { $regex: 'undefined', $options: 'i' } },
      { $unset: { coverImageUrl: "" } }
    );

    console.log('Updated documents:', res.nModified || res.modifiedCount || res);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

run();