const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');

// Register
router.post(
  '/register',
  [
    body('username').trim().notEmpty().withMessage('Username is required').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validateRequest,
  async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    req.session.userId = user._id;

    res.status(201).json({ user: user.toJSON(), message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }
);

// Login
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user._id;

    res.json({ user: user.toJSON(), message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }
);

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user.toJSON() });
});

module.exports = router;
