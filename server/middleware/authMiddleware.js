const jwt = require('jsonwebtoken'); // Import library to verify JSON Web Tokens

// Middleware function to protect routes that require login
const protect = (req, res, next) => { 
  let token; // Initialize variable to hold the token

  // Check if authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract the token string after 'Bearer '
  }

  // If no token is found, send 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' }); 
  }

  try {
    // Verify the token using our secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Call next() to proceed to the next middleware or controller
  } catch (error) {
    // If token is invalid or expired, send 401 error
    return res.status(401).json({ message: 'Not authorized, token failed' }); 
  }
};

module.exports = { protect }; // Export the protect function for use in routes