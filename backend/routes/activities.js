const express = require("express");
const router = express.Router();
const Activity = require("../models/activity");

// Get all activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new activity
router.post("/", async (req, res) => {
  const { name, description, userId } = req.body;
  const activity = new Activity({ name, description, userId });
  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mark activity as completed
router.post("/:id/complete", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    activity.completed = true;
    await activity.save();
    res.json({ message: "Activity completed", activity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
