const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// CREATE TASK
router.post("/", auth, async (req, res) => {
  const { title, description, projectId, assignedTo, priority, dueDate } = req.body;

  const task = new Task({
    title,
    description,
    projectId,
    assignedTo,
    priority,
    dueDate
  });

  await task.save();
  res.json(task);
});

// GET TASKS
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name email")
    .populate("projectId", "name");

  res.json(tasks);
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
});

module.exports = router;