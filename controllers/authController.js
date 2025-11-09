const bcrypt = require("bcrypt");
const User = require("../models/User.Model");
const Otp = require("../models/OTP.Model");
const generateOtp = require("../utils/email/generateOtp");
const emailQueue = require("../utils/email/emailQueue");

const authController = {
  async sendAndSaveOtp(req, res) {
    try {
      const { email } = req.body;
      const generatedOTP = generateOtp(6);

      const newOTP = new Otp({ userEmail: email, otp: generatedOTP });
      await Promise.all([
        newOTP.save(),
        emailQueue.add("sendEmail", {
          email,
          subject: "Account Verification",
          templatePath: "OTP",
          templateData: { email, otp: generatedOTP },
        }),
      ]);

      res.status(201).json({ message: "A 6-digit OTP has been sent to your email" });
    } catch (error) {
      console.error("Error in sendAndSaveOtp:", error);
      res.status(500).json({ message: error.message });
    }
  },

  async resendVerificationCode(req, res) {
    try {
      const { email } = req.body;
      await Otp.deleteMany({ userEmail: email });

      const generatedOTP = generateOtp(6);
      const newOTP = new Otp({ userEmail: email, otp: generatedOTP });

      await Promise.all([
        newOTP.save(),
        emailQueue.add("sendEmail", {
          email,
          subject: "Account Verification (Resend)",
          templatePath: "OTP",
          templateData: { email, otp: generatedOTP },
        }),
      ]);

      res.json({ success: true, message: "New OTP sent to your email." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to resend OTP." });
    }
  },

  async requestForgotPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ success: false, message: "Email required." });

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: "User not found." });

      await Otp.deleteMany({ userEmail: email });
      const generatedOTP = generateOtp(6);
      const newOTP = new Otp({ userEmail: email, otp: generatedOTP });

      await Promise.all([
        newOTP.save(),
        emailQueue.add("sendEmail", {
          email,
          subject: "Password Reset Request",
          templatePath: "OTP",
          templateData: { email, otp: generatedOTP },
        }),
      ]);

      res.json({ success: true, message: "A 6-digit OTP has been sent to your email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to send OTP." });
    }
  },

  async verifyForgotPassword(req, res) {
    try {
      const { email, otp, newPassword, confirmPassword } = req.body;
      if (!email || !otp || !newPassword || !confirmPassword)
        return res.status(400).json({ success: false, message: "All fields required." });
      if (newPassword !== confirmPassword)
        return res.status(400).json({ success: false, message: "Passwords do not match." });

      const foundOTP = await Otp.findOne({ userEmail: email });
      if (!foundOTP || foundOTP.otp !== otp)
        return res.status(400).json({ success: false, message: "Invalid or expired OTP." });

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: "User not found." });

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      await Otp.deleteOne({ userEmail: email });

      res.json({ success: true, message: "Password reset successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Password reset failed." });
    }
  },
};

module.exports = authController;
