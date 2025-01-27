const express = require("express");
const router = express.Router();

// Mock data
let activities = [
  { id: 1, name: "Morning Meditation", description: "Breathing exercise · 10 min", completed: false },
  { id: 2, name: "Mindful Coffee", description: "Relax and enjoy · 5 min", completed: false },
  { id: 3, name: "Daily Affirmation", description: "Positive mindset · 3 min", completed: false },
];

// Get all activities
router.get("/", (req, res) => {
  res.json(activities);
});

// Mark an activity as completed
router.post("/:id/complete", (req, res) => {
  const id = parseInt(req.params.id);
  const activity = activities.find((act) => act.id === id);

  if (activity) {
    activity.completed = true;
    res.json({ message: "Activity completed", activity });
  } else {
    res.status(404).json({ message: "Activity not found" });
  }
});

module.exports = router;
