const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany();
    res.json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch shipments' });
  }
};

exports.createShipment = async (req, res) => {
  try {
    const { trackingId, origin, destination } = req.body;
    const shipment = await prisma.shipment.create({
      data: {
        trackingId,
        origin,
        destination
      }
    });
    res.status(201).json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create shipment' });
  }
};
