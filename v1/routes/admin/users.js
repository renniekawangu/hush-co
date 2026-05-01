const express = require('express');
const router = express.Router();
const User = require('../../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.render('admin/users', { users });
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

// Get user details
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    
    await User.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
      role,
      updatedAt: Date.now()
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
