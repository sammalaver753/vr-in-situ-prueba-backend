import express from 'express';
import { getUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas aquí requieren ser Admin
router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id')
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;