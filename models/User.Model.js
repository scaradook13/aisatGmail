const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  password: {
    type: String, // Only required for email/password registration
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Student", "Admin"],
  },
  status: {
    type: Number,
    default: 1, // 0 meaning unverified email
  },
  isProfileComplete: {
    type: Boolean,
    default: true, // 0 meaning incomplete information 
  },
  profile: {
    // Different profiles based on the role
    type: mongoose.Schema.Types.ObjectId,
    refPath: "role",
  },
  createdAt: {
    type: String,
    default: getDateValue(),
  },
});
function getDateValue() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  let finaldate;

  return (finaldate = `${month} ${day}, ${year}`);
}

const User = mongoose.model("User", userSchema);
module.exports = User;

