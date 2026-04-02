const bcrypt = require('bcryptjs'); // Library to hash passwords securely
const jwt = require('jsonwebtoken'); // Library to create authentication tokens
const { PrismaClient } = require('@prisma/client'); // Import Prisma to talk to DB
const prisma = new PrismaClient(); // Create an instance of Prisma client

// @desc    Register new user
// @route   POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body; // Extract data from request body

    // Check if user already exists in database
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }] // Search by email OR username OR phone
      }
    });

    if (existingUser) { // If a user is found
      return res.status(400).json({ message: 'User already exists' }); // Send error
    }

    // Hash password (encrypt it so it's not stored as plain text)
    const salt = await bcrypt.genSalt(10); // Generate a random salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password with salt

    // Create user in PostgreSQL database
    const user = await prisma.user.create({
      data: { // 'data' key is required for Prisma create
        username,
        email,
        phone,
        password: hashedPassword, // Store hashed password
        isVerified: true // For demo, auto-verify. Real app sends email link.
      }
    });

    // Create JWT Token for immediate login
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' }); 

    res.status(201).json({ // Send 201 Created success response
      message: 'User registered successfully',
      token, // Send token to frontend to store
      user: { id: user.id, username: user.username, email: user.email } // Send user info (no password)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); // Send server error
  }
};

// @desc    Login user
// @route   POST /api/auth/signin
const signin = async (req, res) => {
  try {
    const { loginInput, password } = req.body; // Get loginInput (email/username/phone) and password

    // Find user by email OR username OR phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: loginInput },
          { username: loginInput },
          { phone: loginInput }
        ]
      }
    });

    // If user does not exist
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Send unauthorized error
    }

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) { // If passwords don't match
      return res.status(401).json({ message: 'Invalid credentials' }); // Send unauthorized error
    }

    // Generate Token upon successful login
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' }); 

    res.json({ // Send success response
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); // Send server error
  }
};

module.exports = { signup, signin }; // Export functions for use in routes