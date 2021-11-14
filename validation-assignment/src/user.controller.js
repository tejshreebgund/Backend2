const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Book = require("../models/book.model");
const User = require("../models/user.model");

router.get("/form", async function (req, res) {
  return res.render("users/user", { errors: []});
});

router.post(
  "/form",
  body("age").custom((value) => {
    if (value < 1 || value > 100)
      throw new Error("Should be between 1 and 100.");
    return true;
  }),
  body("pincode").custom((value) => {
    if (value < 100000 || value > 999999)
      throw new Error("Should be exactly 6 numbers");
    return true;
  }),

  body("gender").custom((value) => {
    console.log(value);
    if (value != "Male" && value != "Female" && value != "Others")
      throw new Error("Should be either Male, Female or Others");
    return true;
  }),

  async function (req, res) {
    console.log(req.body, 1);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let finalErrors = null;
      if (!errors.isEmpty()) {
        finalErrors = errors.array().map((error) => {
          return {
            param: error.param,
            msg: error.msg,
          };
        });

        return res.json( {
          errors :finalErrors,
          name: "abhishek",
        });
      }
    }

    try {
      const user = await User.create(req.body);
      return res.status(201).json({ user, success : true });
    } catch (err) {
      return res.status(400).send({ err: err.message, success : false });
    }
  }
);

module.exports = router;
