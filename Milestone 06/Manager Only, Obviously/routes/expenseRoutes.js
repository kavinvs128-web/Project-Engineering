import express from 'express';
import { 
  getAllExpenses, 
  getMyExpenses, 
  createExpense, 
  updateExpense, 
  approveExpense, 
  rejectExpense, 
  deleteExpense 
} from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllExpenses);           // ❌ should be manager+
router.get('/mine', protect, getMyExpenses);
router.post('/', protect, createExpense);
router.put('/:id', protect, updateExpense);
router.put('/:id/approve', protect, approveExpense); // ❌ should be manager+
router.put('/:id/reject', protect, rejectExpense);   // ❌ should be manager+
router.delete('/:id', protect, deleteExpense);      // ❌ should be admin-only

export default router;
