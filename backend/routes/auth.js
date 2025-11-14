


// const express = require('express');
// const { body } = require('express-validator');
// const { register, login, getMe } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');

// const router = express.Router();

// // Register
// router.post(
//   '/register',
//   [
//     body('name').notEmpty().withMessage('Name required'),
//     body('email').isEmail().withMessage('Valid email required'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be >= 6 chars'),
//   ],
//   register
// );

// // Login
// router.post(
//   '/login',
//   [
//     body('email').isEmail().withMessage('Valid email required'),
//     body('password').exists().withMessage('Password required'),
//   ],
//   login
// );

// // Get current logged-in user
// router.get('/me', protect, getMe);

// module.exports = router;


const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password >= 6 chars'),
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').exists().withMessage('Password required'),
  ],
  login
);

// Get current logged-in user
router.get('/me', protect, getMe);

module.exports = router;
