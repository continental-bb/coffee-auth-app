const { validationResult } = require('express-validator'); // Import validation result checker

// Middleware to check if input validation failed
const validate = (req, res, next) => { 
  const errors = validationResult(req); // Get any validation errors from previous checks
  if (!errors.isEmpty()) { // If there are errors (array is not empty)
    return res.status(400).json({ errors: errors.array() }); // Send 400 Bad Request with error details
  }
  next(); // If no errors, continue to the controller
};

module.exports = { validate }; // Export the validate function