
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateUser = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token, authorization denied'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user to request
    req.user = decoded;
    
    // Validate that user exists in database
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid user'
      });
    }
    
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};
