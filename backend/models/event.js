const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  date: String,
  title: String,
  time: String,
  address: String,
  description: String,
  image: String,
});

const event = mongoose.model("Event", eventSchema);

module.exports = event;