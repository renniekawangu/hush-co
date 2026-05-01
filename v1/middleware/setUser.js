// User authentication middleware
// Sets user data on request object from session

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    res.locals.user = req.session.user;
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
};
