const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/send-otp", authController.sendAndSaveOtp);
router.post("/resendVerification", authController.resendVerificationCode);
router.post("/requestForgotPassword", authController.requestForgotPassword);
router.post("/verify-forgot-password", authController.verifyForgotPassword);

module.exports = router;
