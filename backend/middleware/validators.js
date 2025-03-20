
const { validationResult, check } = require('express-validator');

// Middleware to validate user registration
exports.validateUserRegistration = [
  check('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  check('age')
    .optional()
    .isInt({ min: 5, max: 18 })
    .withMessage('Age must be between 5 and 18 for students'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
      });
    }
    next();
  }
];

// Middleware to validate login
exports.validateLogin = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
      });
    }
    next();
  }
];

// Middleware to validate quest submission
exports.validateQuestSubmission = [
  check('answers')
    .optional()
    .isArray()
    .withMessage('Answers must be an array'),
  
  check('timeSpent')
    .optional()
    .isNumeric()
    .withMessage('Time spent must be a number'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
      });
    }
    next();
  }
];
