const express = require("express");
const router = express.Router();

const Student = require("../models/student");

const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  Student.findOne({ email: req.body.email })
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
router.post("/signup", (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phone
  ) {
    if (!req.body.firstName) {
      res.status(200).json({
        result: "0",
      });
    }
    if (!req.body.lastName) {
      res.status(200).json({
        result: "1",
      });
    }
    if (!req.body.email) {
      res.status(200).json({
        result: "2",
      });
    }
    if (!req.body.password) {
      res.status(200).json({
        result: "3",
      });
    }
    if (!req.body.phone) {
      res.status(200).json({
        result: "4",
      });
    }
  } else if (req.body.password != req.body.confirmPassword) {
    res.status(200).json({
      result: "5",
    });
  } else {
    bcrypt.hash(req.body.password, 8).then((encryptedPassword) => {
      const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: encryptedPassword,
        role: req.body.role,
      });
      student.save((error, result) => {
        if (error) {
          if (error.errors.email){
            res.status(200).json({
              result: "6",
            });
          }
        } else if (result) {
          res.status(200).json({
            result: "Added with success",
          });
        }
      })
    });
  }
});
router.get("/", (req, res) => {
  Student.find().then((data) => {
    res.status(200).json({
      result: data
    })
  })
})
router.delete("/:id", (req, res) => {
  Student.deleteOne({_id:req.params.id}).then((data) => {
    res.status(200).json({
      result: "deleted with success"
    })
  })
})
router.put("/:id", (req, res) => {
  Student.updateOne({_id:req.params.id}, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success"
    })
  })
})
router.get("/:id", (req, res) => {
  Student.findOne({ _id : req.params.id}).then((data) => {
    res.status(200).json({
      result: data
    })
  })
})

module.exports = router;
