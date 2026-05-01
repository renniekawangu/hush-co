const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware to check admin access
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Unauthorized');
  }
  next();
};

// Admin dashboard
router.get('/', requireAdmin, (req, res) => {
  res.render('admin/dashboard');
});

// Admin routes
router.use('/products', requireAdmin, require('./admin/products'));
router.use('/users', requireAdmin, require('./admin/users'));

module.exports = router;
