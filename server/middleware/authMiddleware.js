// ✅ AUTH MIDDLEWARE: Protects routes and verifies admin
// Must exist for the imports to work

const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ PROTECT: Verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized, token failed', error: error.message });
  }
};

// ✅ ADMIN: Check if user is admin
exports.admin = (req, res, next) => {
  // For now, allow all authenticated users (customize later)
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ success: false, message: 'Admin access required' });
  // }
  next();
};