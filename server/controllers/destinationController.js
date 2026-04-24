// ✅ DESTINATION CONTROLLER: Handles destination CRUD operations

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ GET ALL DESTINATIONS
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany({
      where: { available: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, count: destinations.length, data: destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ GET SINGLE DESTINATION
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await prisma.destination.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ CREATE DESTINATION (Admin)
exports.createDestination = async (req, res) => {
  try {
    const { name, description, location, price, imageUrl, duration } = req.body;
    const destination = await prisma.destination.create({
      data: { name, description, location, price: parseFloat(price), imageUrl, duration }
    });
    res.status(201).json({ success: true, message: 'Destination created', data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ UPDATE DESTINATION (Admin)
exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, price, imageUrl, duration, available } = req.body;
    const destination = await prisma.destination.update({
      where: { id: parseInt(id) },
      data: { name, description, location, price: parseFloat(price), imageUrl, duration, available }
    });
    res.json({ success: true, message: 'Destination updated', data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ DELETE DESTINATION (Admin)
exports.deleteDestination = async (req, res) => {
  try {
    await prisma.destination.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true, message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};