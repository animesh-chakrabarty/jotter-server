const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  OTP: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("OTP", OTPSchema);
