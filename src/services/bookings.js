const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createBooking(data) {
  try {
    const booking = await prisma.booking.create({
      data,
    });

    return {
      success: true,
      booking,
    };

  } catch (error) {
    // Prisma unique constraint error (P2002)
    if (error.code === "P2002") {
      return {
        success: false,
        status: 409,
        message: "Seat already booked for this show",
      };
    }

    throw error;
  }
}

module.exports = {
  createBooking,
};