import express from 'express';
import {
  getProfile,
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  updateProfile,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Admin-only student CRUD routes
router.get('/students', admin, getAllStudents);
router.get('/students/:id', admin, getStudentById);
router.post('/students', admin, createStudent);
router.put('/students/:id', admin, updateStudent);
router.delete('/students/:id', admin, deleteStudent);

export default router;
