const express = require("express");
const router = express.Router();

const Teacher = require("../models/teacher");

const multer = require("multer");

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});

router.get("/", (req, res) => {
  Teacher.find().then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});

router.get("/:id", (req, res) => {
  Teacher.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});

router.put("/:id", multer({ storage: storage }).single("image"), (req, res) => {
  let url = req.protocol + "://" + req.get("host");
  req.body.image = url + "/images/" + req.file.filename
  Teacher.updateOne({ _id: req.params.id }, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success",
    });
  });
});

router.post("/signup", multer({ storage: storage }).single("image"), (req, res) => {
  let url = req.protocol + "://" + req.get("host");
  const teacher = new Teacher({
    field: req.body.field,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    image: url + "/images/" + req.file.filename,
    role: req.body.role,
  });
  teacher.save((error, result) => {
    if (error) {
      console.log(error);
    } else if (result) {
      res.status(200).json({
        result: "added with success",
      });
    }
  });
});

router.post("/login", (req, res) => {
  Teacher.findOne({ email: req.body.email })
    .then((emailResult) => {
      if (!emailResult) {
        res.status(200).json({
          result: false,
        });
      }
      return bcrypt.compare(req.body.password, emailResult.password);
    })
    .then((passwordResult) => {
      if (!passwordResult) {
        res.status(200).json({
          result: false,
        });
      }
      res.status(200).json({
        result: true,
      });
    });
});

router.delete("/:id", (req, res) => {
  Teacher.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: "deleted with success",
    });
  });
});

module.exports = router;
