import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// CREATE TASK
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ALL TASKS
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE TASK
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    await pool.query(
      "UPDATE tasks SET title=$1, description=$2, completed=$3 WHERE id=$4",
      [title, description, completed, id]
    );

    res.json("Task updated ✅");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);

    res.json("Task deleted ✅");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});