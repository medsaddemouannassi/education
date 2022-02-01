const express = require("express");
const router = express.Router();

const Event = require("../models/event");

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
  Event.find().then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});

router.get("/:id", (req, res) => {
  Event.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});

router.put("/:id", multer({ storage: storage }).single("image"), (req, res) => {
  let url = req.protocol + "://" + req.get("host");
  req.body.image = url + "/images/" + req.file.filename
  Event.updateOne({ _id: req.params.id }, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success",
    });
  });
});

router.post("/", multer({ storage: storage }).single("image"), (req, res) => {
  let url = req.protocol + "://" + req.get("host");
  const event = new Event({
    date: req.body.date,
    title: req.body.title,
    time: req.body.time,
    address: req.body.address,
    description: req.body.description,
    image: url + "/images/" + req.file.filename,
  });
  event.save().then((data) => {
    res.status(200).json({
      result: "added with success",
    });
  });
});

router.delete("/:id", (req, res) => {
  Event.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: "deleted with success",
    });
  });
});

module.exports = router;
