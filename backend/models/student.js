const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const studentSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: String,
});

studentSchema.plugin(uniqueValidator);

const student = mongoose.model("Student", studentSchema);

module.exports = student;