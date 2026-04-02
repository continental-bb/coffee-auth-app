const express = require('express'); // Import Express router
const router = express.Router(); // Create a mini-app for routes
const { signup, signin } = require('../controllers/authController'); // Import controllers
const { body } = require('express-validator'); // Import validation rules builder
const { validate } = require('../middleware/validatorMiddleware'); // Import validation middleware

// Validation Rules for Signup
const signupRules = [
  body('username').trim().isLength({ min: 3 }).escape(), // Username min 3 chars, remove HTML
  body('email').isEmail().normalizeEmail(), // Must be valid email format
  body('phone').isMobilePhone(), // Must be valid phone number
  body('password').isStrongPassword({ // Password must be strong
    minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 
  }),
  validate // Run the validation middleware to check rules
];

// Validation Rules for Signin
const signinRules = [
  body('loginInput').trim().escape(), // Sanitize input to prevent XSS
  body('password').notEmpty(), // Password cannot be empty
  validate // Run the validation middleware
];

// Define Routes
router.post('/signup', signupRules, signup); // POST request to /signup with validation
router.post('/signin', signinRules, signin); // POST request to /signin with validation

module.exports = router; // Export router to be used in server.js