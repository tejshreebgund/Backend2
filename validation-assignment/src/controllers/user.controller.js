const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/user.model");

router.get("/form", async function (req, res) {
  return res.render("users/user", { errors: []});
});

router.post(
  "/form",
  body("age").custom((value) => {
    if (value < 1 || value > 100)
      throw new Error("Age should be between 1 and 100.");
    return true;
  }),
  body("pincode").custom((value) => {
    if (value < 100000 || value > 999999)
      throw new Error("Pincode should be exactly 6 numbers");
    return true;
  }),

  body("gender").custom((value) => {
    if (value != "Male" && value != "Female" && value != "Others" )
      throw new Error("Gender should be either Male, Female or Others");
    return true;
  }),

  async function (req, res) {
    console.log(req.body);
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

        return res.render("users/user", {
          errors :finalErrors,
          name: "neha",
        });
      }
    }

    try {
      const user = await User.create(req.body);
    //   console.log(req.body, 2);
      return res.status(201).json({ user });
    } catch (err) {
      return res.status(400).send({ err: err.message });
    }
  }
);

module.exports = router;
