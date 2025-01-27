const express = require("express");
const Course = require("../models/course");
const User = require("../models/user");
const router = express.Router();

// گرفتن همه دوره‌ها
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("prerequisites");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تکمیل دوره
router.post("/:id/complete", async (req, res) => {
  const userId = req.body.userId; // ID کاربر از درخواست
  const courseId = req.params.id;

  try {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    // بررسی پیش‌نیازها
    if (
      course.prerequisites &&
      !user.completedCourses.includes(course.prerequisites.toString())
    ) {
      return res.status(400).json({
        message: "You need to complete the prerequisite course first.",
      });
    }

    // افزودن دوره به تکمیل‌شده‌ها
    if (!user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
      user.points += course.points;
      await user.save();
    }

    res.json({ message: "Course completed successfully!", points: user.points });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
