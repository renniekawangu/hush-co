const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ error: 'User not found' });
      }
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

module.exports = { authMiddleware, adminMiddleware };
