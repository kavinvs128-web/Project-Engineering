import express from 'express';
import { getAllUsers, updateUserRole, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllUsers);          // ❌ should be admin-only
router.put('/:id/role', protect, updateUserRole); // ❌ should be admin-only
router.get('/me', protect, getUserProfile);

export default router;
