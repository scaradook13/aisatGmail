const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    ref: "User",
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // 900 seconds = 15 minutes
  }
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;