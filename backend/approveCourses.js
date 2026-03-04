require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./src/models/Course");

const approvePendingCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Update all pending courses to approved
    const result = await Course.updateMany(
      { status: "pending" },
      { status: "approved" },
    );

    console.log(
      `\n✅ Updated ${result.modifiedCount} courses to approved status\n`,
    );

    // Show all approved courses now
    const approvedCourses = await Course.find({ status: "approved" }).populate(
      "teacherId",
      "name email",
    );
    console.log(`Total approved courses: ${approvedCourses.length}\n`);

    approvedCourses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title} (${course.subject})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

approvePendingCourses();
