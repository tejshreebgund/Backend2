

const path = require("path")
const express =  require("express");
const userController = require("./controllers/user.controller")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"uploads")))
app.use("/users",userController)
module.exports=app;