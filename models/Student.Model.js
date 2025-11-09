const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: null
  },
  studentNumber: {
    type: Number,
    default: null
  },
  section: {
    type: String,
    default: null,
  },
  teacherEvaluated: {
    type: [String],
    default: [], // <-- make it an array
  },
  createdAt: {
    type: String,
    default: getDateValue(),
  },
  updatedAt: {
    type: String,
    default: getDateValue(),
  },
});

function getDateValue() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
