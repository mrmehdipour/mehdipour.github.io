const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 }, // امتیازات کاربر
  completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // دوره‌های تکمیل‌شده
});

module.exports = mongoose.model("User", userSchema);
