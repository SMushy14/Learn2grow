const {
  createCourse,
  getApprovedCourses,
  updateCourseStatus,
  getCourseById,         // NEW
  getTeacherCourses,     // NEW
  getAllCoursesAdmin     // NEW
} = require('../controllers/courseController');
const express = require('express');
const router = express.Router();
const {
  createCourse,
  getApprovedCourses,
  updateCourseStatus
} = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public/Student route: Get all approved courses
router.get('/', getApprovedCourses);

// Teacher route: Create a course
// 'protect' ensures they are logged in. 'authorize' ensures they are a teacher.
router.post('/', protect, authorize('teacher', 'admin'), createCourse);

// Admin route: Update course status (Approve/Reject)
router.put('/:id/status', protect, authorize('admin'), updateCourseStatus);

module.exports = router;