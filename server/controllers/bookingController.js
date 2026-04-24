// ✅ BOOKING CONTROLLER: Handles booking operations

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { destinationId, tripDate, guests } = req.body;
    
    const destination = await prisma.destination.findUnique({
      where: { id: parseInt(destinationId) }
    });
    
    if (!destination || !destination.available) {
      return res.status(400).json({ success: false, message: 'Destination not available' });
    }
    
    const totalPrice = destination.price * guests;
    
    const booking = await prisma.booking.create({
      data: {
        userId,
        destinationId: parseInt(destinationId),
        bookingDate: new Date(),
        tripDate: new Date(tripDate),
        guests: parseInt(guests),
        totalPrice,
        status: 'pending'
      },
      include: { destination: true }
    });
    
    res.status(201).json({ success: true, message: 'Booking created', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { destination: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ GET SINGLE BOOKING
exports.getBookingById = async (req, res) => {
  try {
    const userId = req.user.id;
    const booking = await prisma.booking.findFirst({
      where: { id: parseInt(req.params.id), userId },
      include: { destination: true }
    });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ✅ CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const booking = await prisma.booking.updateMany({
      where: { id: parseInt(req.params.id), userId },
      data: { status: 'cancelled' }
    });
    if (booking.count === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};