const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addRoommate = async (req, res) => {
    console.log("Adding a person..."); // Scattered log without context
    try {
        const roommate = await prisma.roommate.create({ data: { name: req.body.name } });
        res.status(201).json(roommate);
    } catch (err) {
        console.log("Roommate fail"); // Vague log
        res.status(500).json({ error: "Fail" }); // Generic response
    }
};

exports.getRoommates = async (req, res) => {
    try {
        res.json(await prisma.roommate.findMany());
    } catch (err) {
        res.status(500).json({ error: "Fail" });
    }
};
