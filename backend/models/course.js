const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  teacher: String,
  field: String,
  description: String,
  price: String,
  numberOfStudents: Number,
  image: String,
});

const course = mongoose.model("Course", courseSchema);

module.exports = course;
