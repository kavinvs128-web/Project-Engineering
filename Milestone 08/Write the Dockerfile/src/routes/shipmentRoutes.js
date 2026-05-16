const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', shipmentController.getAllShipments);
router.post('/', shipmentController.createShipment);

module.exports = router;
