


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');
// const User = require('../models/User');
// const asyncHandler = require('../utils/asyncHandler');

// // 🔹 Generate JWT token
// const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// // 🔹 Register
// exports.register = asyncHandler(async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

//   const { name, email, password } = req.body;
//   const existing = await User.findOne({ email });
//   if (existing) return res.status(400).json({ message: 'Email already registered' });

//   const salt = await bcrypt.genSalt(10);
//   const hashed = await bcrypt.hash(password, salt);

//   const user = await User.create({ name, email, password: hashed });
//   const token = signToken(user._id);

//   res.status(201).json({
//     user: { id: user._id, name: user.name, email: user.email },
//     token,
//   });
// });

// // 🔹 Login
// exports.login = asyncHandler(async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//   const token = signToken(user._id);
//   res.json({
//     user: { id: user._id, name: user.name, email: user.email },
//     token,
//   });
// });

// // 🔹 Get logged-in user
// exports.getMe = asyncHandler(async (req, res) => {
//   if (!req.user) return res.status(401).json({ message: 'Not authorized' });
//   res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
// });
// exports.getMe = async (req, res) => {
//   if (!req.user) return res.status(401).json({ message: "User not found" });
//   res.json(req.user);
// };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
exports.register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashed });
  const token = signToken(user._id);

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = signToken(user._id);
  res.json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});

// Get current logged-in user
exports.getMe = asyncHandler(async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  res.json(req.user);
});
