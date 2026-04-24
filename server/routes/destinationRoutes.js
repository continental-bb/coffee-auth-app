// ✅ DESTINATION ROUTES: API endpoints for destination operations
// Handles CRUD operations for tourism destinations

const express = require('express');
const router = express.Router();
const {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');
const { protect, admin } = require('../middleware/authMiddleware');

// ✅ PUBLIC ROUTES
router.get('/', getAllDestinations);
router.get('/:id', getDestinationById);

// ✅ PROTECTED ROUTES (Admin only)
router.post('/', protect, admin, createDestination);
router.put('/:id', protect, admin, updateDestination);
router.delete('/:id', protect, admin, deleteDestination);

module.exports = router;