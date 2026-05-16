const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const roommateController = require('../controllers/roommateController');

// Expense endpoints
router.post('/', expenseController.addExpense);
router.get('/', expenseController.getExpenses);
router.get('/balances', expenseController.getBalances);

// Roommate endpoints (No validation checking)
router.post('/roommates', roommateController.addRoommate);
router.get('/roommates', roommateController.getRoommates);

module.exports = router;
