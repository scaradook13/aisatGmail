const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
  teacher:{
    type: String,
    required: true,
  },
  section:{
    type: String,
    required: true,
  },
  answers:{
    type: Object,
    required: true,
  },
  comment:{
    type: String,
    required: false
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
  let finaldate;

  return (finaldate = `${month} ${day}, ${year}`);
}

const Evaluation = mongoose.model("Evaluation", evaluationSchema);
module.exports = Evaluation;