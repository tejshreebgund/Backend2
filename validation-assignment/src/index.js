const express = require("express");

const userController = require("./controllers/user.controller");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use("/users", userController);
module.exports = app;
