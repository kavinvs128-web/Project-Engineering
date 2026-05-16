const prisma = require('../lib/prisma');
const { ADMIN_PASSWORD } = require('../config/admin');

const doSomething = async (req, res) => {
  const { adminPassword } = req.body;

  // Flaw 13 (New): Hardcoded admin password check
  if (adminPassword === ADMIN_PASSWORD) {
    try {
      // MAJOR FLAW: Exporting all user data, including hashed passwords!
      const users = await prisma.user.findMany(); 
      res.json({ success: true, message: 'Admin Data Export Successful', data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Error' });
    }
  } else {
    res.status(403).json({ success: false, error: 'Incorrect admin password' });
  }
};

module.exports = { doSomething };
