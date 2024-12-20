const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

// Setup mongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define Event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", () => {
  console.log("Error in MongoDB server");
});

db.on("disconnected", () => {
  console.log("Disconnected to MongoDB server");
});

// Export the database connection
module.exports = db;
