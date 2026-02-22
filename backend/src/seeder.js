const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import Models
const User = require('./models/User');
const Course = require('./models/Course');

// Import Data
const users = require('./data/users');
const courses = require('./data/courses');

// Load env variables (Ensure the path to your .env is correct)
dotenv.config({ path: '../.env' });

// Connect to the database
connectDB();

const importData = async () => {
  try {
    // 1. Clear out any existing data to prevent duplicates
    await Course.deleteMany();
    await User.deleteMany();

    // 2. Insert the users one by one to ensure the bcrypt password hashing hook runs
    const createdUsers = [];
    for (let user of users) {
      const createdUser = await User.create(user);
      createdUsers.push(createdUser);
    }

    // 3. Find the ID of the teacher we just created
    const teacherId = createdUsers[1]._id;

    // 4. Attach the teacher's ID to every sample course
    const sampleCourses = courses.map((course) => {
      return { ...course, teacherId: teacherId };
    });

    // 5. Insert the courses
    await Course.insertMany(sampleCourses);

    console.log('Data successfully imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear out the database
    await Course.deleteMany();
    await User.deleteMany();

    console.log('🗑️ Data successfully destroyed!');
    process.exit();
  } catch (error) {
    console.error(` Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Check the terminal command flag to see if we should import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}