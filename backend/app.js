const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../dist/education"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/../dist/education/index.html"));
});

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/educationDB");

const path = require("path");
app.use("/images", express.static(path.join("backend/images")));

const courseRoutes = require("./routes/course-routes");
const eventRoutes = require("./routes/event-routes");
const teacherRoutes = require("./routes/teacher-routes");
const studentRoutes = require("./routes/student-routes");

app.use("/api/allCourses", courseRoutes);
app.use("/api/allEvents", eventRoutes);
app.use("/api/allTeachers", teacherRoutes);
app.use("/api/students", studentRoutes);

module.exports = app;
