const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: '401 - Unauthorized' });
  };
  
  module.exports = { isAuthenticated };
  