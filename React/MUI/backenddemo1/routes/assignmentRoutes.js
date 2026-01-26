const express = require("express");
const router = express.Router();
const {
  getAssignments,
  createAssignment,
} = require("../controllers/assignmentController");

router.get("/student/assignments", getAssignments);
router.post("/student/assignments", createAssignment);

module.exports = router;
