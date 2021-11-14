const mongoose = require ("mongoose");
const userSchema = new mongoose.Schema({
    first_name:{type:String,default : ""},
    last_name:{type:String,default : ""},
    profile:{type:String,default : ""}
})
module.exports=mongoose.model("user",userSchema)