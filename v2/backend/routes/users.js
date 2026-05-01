const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');

// Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user.toJSON() });
});

// Update profile
router.put(
  '/profile',
  authMiddleware,
  [
    body('firstName').optional().trim().isLength({ min: 1 }).withMessage('First name cannot be empty'),
    body('lastName').optional().trim().isLength({ min: 1 }).withMessage('Last name cannot be empty'),
    body('phone').optional().trim().isLength({ min: 5 }).withMessage('Phone must be valid'),
    body('address').optional().trim().isLength({ min: 3 }).withMessage('Address must be valid'),
    body('city').optional().trim().isLength({ min: 2 }).withMessage('City must be valid'),
    body('state').optional().trim().isLength({ min: 2 }).withMessage('State must be valid'),
    body('zipCode').optional().trim().isLength({ min: 3 }).withMessage('Zip code must be valid'),
    body('country').optional().trim().isLength({ min: 2 }).withMessage('Country must be valid')
  ],
  validateRequest,
  async (req, res) => {
  try {
    const { firstName, lastName, phone, address, city, state, zipCode, country } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone, address, city, state, zipCode, country, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }
);

// Delete user (admin only)
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  [param('id').isMongoId().withMessage('Invalid user id')],
  validateRequest,
  async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }
);

module.exports = router;
