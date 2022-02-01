const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const teacherSchema = mongoose.Schema({
  field: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  role: String,
});

teacherSchema.plugin(uniqueValidator);

const teacher = mongoose.model("Teacher", teacherSchema);
module.exports = teacher;