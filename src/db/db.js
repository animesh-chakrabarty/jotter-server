const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const mongoConnectionResponse = await mongoose.connect(MONGO_URI);
    console.log(mongoConnectionResponse.connection.host);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = connectDB;
