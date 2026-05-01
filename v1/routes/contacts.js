const express = require('express');
const router = express.Router();
const Message = require('../models/messages');

// Contact form page
router.get('/', (req, res) => {
  res.render('contact');
});

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();

    res.status(201).render('contact', { success: 'Message sent successfully' });
  } catch (error) {
    res.status(500).render('contact', { error: error.message });
  }
});

module.exports = router;
