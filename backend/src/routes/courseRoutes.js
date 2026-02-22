const express = require('express');
const router = express.Router();
const {
  createCourse,
  getApprovedCourses,
  updateCourseStatus,
  getCourseById,
  getTeacherCourses,
  getAllCoursesAdmin
} = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// --- NEW RETRIEVAL ROUTES ---

// Admin route: See everything (pending, approved, rejected)
router.get('/admin/all', protect, authorize('admin'), getAllCoursesAdmin);

// Teacher route: See only what they uploaded
router.get('/teacher/my-courses', protect, authorize('teacher'), getTeacherCourses);

// Public route: Get a single course's details
router.get('/:id', getCourseById);

// --- ORIGINAL ROUTES ---

// Public/Student route: Get all approved courses
router.get('/', getApprovedCourses);

// Teacher route: Create a course
router.post('/', protect, authorize('teacher', 'admin'), createCourse);

// Admin route: Update course status (Approve/Reject)
router.put('/:id/status', protect, authorize('admin'), updateCourseStatus);

module.exports = router;