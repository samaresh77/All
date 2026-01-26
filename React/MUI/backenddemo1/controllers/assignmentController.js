const Assignment = require("../models/Assignment");

// GET /student/assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments); // response payload
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// POST /student/assignments
exports.createAssignment = async (req, res) => {
  try {
    const { title, subject, dueDate, status } = req.body; // request payload

    const newAssignment = new Assignment({
      title,
      subject,
      dueDate,
      status,
    });

    const saved = await newAssignment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
};
