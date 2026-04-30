const express = require("express");
const router = express.Router();
const Project = require("../models/Projects");
const auth = require("../middleware/auth");

// CREATE PROJECT (Admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Only admin can create project" });
  }

  const { name, description, members } = req.body;

  const project = new Project({
    name,
    description,
    members,
    createdBy: req.user.id
  });

  await project.save();
  res.json(project);
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  const projects = await Project.find()
    .populate("members", "name email")
    .populate("createdBy", "name");

  res.json(projects);
});

// UPDATE PROJECT
router.put("/:id", auth, async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(project);
});

// DELETE PROJECT
router.delete("/:id", auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "Project deleted" });
});

module.exports = router;