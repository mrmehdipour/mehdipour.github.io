const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  topic: { type: String }, // موضوع دوره
  fileType: { type: String, enum: ["video", "audio"], required: true }, // نوع فایل
  filePath: { type: String, required: true }, // مسیر فایل
  points: { type: Number, required: true }, // امتیاز دوره
  prerequisites: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // پیش‌نیاز
});

module.exports = mongoose.model("Course", courseSchema);

