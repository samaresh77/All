const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  dueDate: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Submitted", "Late"],
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
