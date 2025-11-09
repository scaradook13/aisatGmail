const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  formDate: {
    type: String,
    required: true,
  },
  formData: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
  status: {
    type: String,
    required: true,
    default: "active",
  },
  evaluations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
    }],
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

const Form = mongoose.model("Form", formSchema);
module.exports = Form;