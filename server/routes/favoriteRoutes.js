// ✅ FAVORITE ROUTES: API endpoints for wishlist operations
// All routes require authentication

const express = require('express');
const router = express.Router();
const {
  addToFavorites,
  getUserFavorites,
  removeFromFavorites,
  checkFavorite
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

// ✅ ALL ROUTES PROTECTED
router.post('/', protect, addToFavorites);
router.get('/', protect, getUserFavorites);
router.delete('/:id', protect, removeFromFavorites);
router.get('/check/:destinationId', protect, checkFavorite);

module.exports = router;