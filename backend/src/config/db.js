const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Attempt to connect to the database using the URI from the .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options help with stability and deprecation warnings
      // useNewUrlParser and useUnifiedTopology are now default in mongoose 6+
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process with a failure code if the connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
