const mongoose = require("mongoose");
const Course = require("./models/course");

const courses = [
  { title: "Course 1", topic: "Math", points: 10, fileType: "video", filePath: "path/to/file1.mp4" },
  { title: "Course 2", topic: "Math", points: 15, fileType: "audio", filePath: "path/to/file2.mp3", prerequisites: "ID1" },
  // سایر دوره‌ها
];

mongoose.connect("MONGO_URI", { useNewUrlParser: true, useUnifiedTopology: true }, async () => {
  await Course.insertMany(courses);
  console.log("Courses added!");
  mongoose.disconnect();
});
