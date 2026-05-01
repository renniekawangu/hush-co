const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Login route
router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).render('auth/login', { error: 'Invalid credentials' });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role
    };

    res.redirect('/');
  } catch (error) {
    res.status(500).render('auth/login', { error: error.message });
  }
});

// Signup route
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).render('auth/signup', { error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).render('auth/signup', { error: 'Email or username already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    req.session.user = {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role
    };

    res.redirect('/');
  } catch (error) {
    res.status(500).render('auth/signup', { error: error.message });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
});

module.exports = router;
