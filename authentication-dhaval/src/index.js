const path = require('path')
const express = require("express");

const app = express();
app.use(express.json())
const {signup,signin}= require("./controllers/authcontroller")
const userController = require("./controllers/user.controller")

app.post("/signup",signup)
app.post("/signin",signin)
app.use("/users",userController)




module.exports=app;
