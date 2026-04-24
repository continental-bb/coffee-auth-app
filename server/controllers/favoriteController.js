// ✅ FAVORITE CONTROLLER: Handles wishlist operations

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ ADD TO FAVORITES
exports.addToFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { destinationId } = req.body;
    
    const favorite = await prisma.favorite.create({
      data: { userId, destinationId: parseInt(destinationId) },
      include: { destination: true }
    });
    
    res.status(201).json({ success: true, message: 'Added to favorites', data: favorite });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Already in favorites' });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ GET USER FAVORITES
exports.getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { destination: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, count: favorites.length, data: favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ REMOVE FROM FAVORITES
exports.removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    await prisma.favorite.deleteMany({
      where: { userId, destinationId: parseInt(req.params.id) }
    });
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ CHECK IF FAVORITE
exports.checkFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { destinationId } = req.params;
    
    const favorite = await prisma.favorite.findFirst({
      where: { userId, destinationId: parseInt(destinationId) }
    });
    
    res.json({ success: true, isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};