

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// exports.protect = async (req, res, next) => {
//   let token = null;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = { id: decoded.id };
    
//   } catch (err) {
//     console.error("Auth middleware error:", err);
//     return res.status(401).json({ message: 'Token invalid' });
//   }
// };

// exports.protect = async (req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   let token = null;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = { id: decoded.id };

//     return next();
//   } catch (err) {
//     console.error("Auth middleware error:", err);
//     return res.status(401).json({ message: 'Token invalid' });
//   }
// };

exports.protect = async (req, res, next) => {
  // Allow Preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    return next(); // REQUIRED!
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: 'Token invalid' });
  }
};