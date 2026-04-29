const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Get all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create task (admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Not allowed" });

  const task = new Task({ title: req.body.title });
  await task.save();

  res.json(task);
});

// Update task status
router.put("/:id", auth, async (req, res) => {
  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(task);
});

module.exports = router;