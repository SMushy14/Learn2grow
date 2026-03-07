require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./src/models/Course");

const checkCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Get all courses
    const allCourses = await Course.find({});
    console.log(`\n=== TOTAL COURSES IN DATABASE: ${allCourses.length} ===\n`);

    // Group by status
    const approvedCourses = await Course.find({ status: "approved" });
    const pendingCourses = await Course.find({ status: "pending" });
    const rejectedCourses = await Course.find({ status: "rejected" });

    console.log(`Approved courses: ${approvedCourses.length}`);
    console.log(`Pending courses: ${pendingCourses.length}`);
    console.log(`Rejected courses: ${rejectedCourses.length}`);

    console.log("\n=== APPROVED COURSES ===");
    approvedCourses.forEach((course, index) => {
      console.log(
        `${index + 1}. ${course.title} (${course.subject}) - ${course.status}`,
      );
    });

    console.log("\n=== ALL COURSES ===");
    allCourses.forEach((course, index) => {
      console.log(
        `${index + 1}. ${course.title} (${course.subject}) - ${course.status}`,
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkCourses();
