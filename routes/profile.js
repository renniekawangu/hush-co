const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }
  next();
};

// View profile
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.render('profile/profile', { user });
  } catch (error) {
    res.status(500).send('Error fetching profile');
  }
});

// Update profile
router.post('/', requireAuth, async (req, res) => {
  try {
    const { firstName, lastName, phone, address, city, state, zipCode, country } = req.body;
    
    await User.findByIdAndUpdate(req.user.id, {
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      updatedAt: Date.now()
    });

    res.redirect('/profile');
  } catch (error) {
    res.status(500).send('Error updating profile');
  }
});

// Settings page
router.get('/settings', requireAuth, (req, res) => {
  res.render('profile/settings');
});

// Update settings
router.post('/settings', requireAuth, async (req, res) => {
  try {
    const { password, newPassword, confirmPassword } = req.body;
    
    if (newPassword !== confirmPassword) {
      return res.status(400).render('profile/settings', { error: 'Passwords do not match' });
    }

    const user = await User.findById(req.user.id);
    
    if (!(await user.comparePassword(password))) {
      return res.status(401).render('profile/settings', { error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.redirect('/profile/settings?success=true');
  } catch (error) {
    res.status(500).send('Error updating settings');
  }
});

module.exports = router;
