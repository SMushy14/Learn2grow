const Course = require('../models/Course');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Teachers only)
exports.createCourse = async (req, res) => {
  try {
    // We attach the logged-in user's ID to the course data
    const courseData = {
      ...req.body,
      teacherId: req.user._id
    };

    const course = await Course.create(courseData);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all APPROVED courses (with optional search/filtering)
// @route   GET /api/courses
// @access  Public / Students
exports.getApprovedCourses = async (req, res) => {
  try {
    // Start with a base query that only looks for approved courses
    const query = { status: 'approved' };

    // If the frontend sends a subject filter (?subject=Math)
    if (req.query.subject) {
      query.subject = req.query.subject;
    }

    // If the frontend sends a language filter (?language=English)
    if (req.query.language) {
      query.language = req.query.language;
    }

    const courses = await Course.find(query).populate('teacherId', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve or reject a course
// @route   PUT /api/courses/:id/status
// @access  Private (Admins only)
exports.updateCourseStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Ensure the admin sent a valid status
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get a single course by ID (for the course details page)
// @route   GET /api/courses/:id
// @access  Public / Students
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacherId', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get courses uploaded by the logged-in teacher
// @route   GET /api/courses/teacher/my-courses
// @access  Private (Teachers only)
exports.getTeacherCourses = async (req, res) => {
  try {
    // Finds only courses where the teacherId matches the logged-in user's token ID
    const courses = await Course.find({ teacherId: req.user._id });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ALL courses (Pending, Approved, Rejected) for the dashboard
// @route   GET /api/courses/admin/all
// @access  Private (Admins only)
exports.getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find({}).populate('teacherId', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};