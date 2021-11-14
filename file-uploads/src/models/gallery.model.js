const mongoose = require ("mongoose");
const gallerySchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    pictures:[{type:String, default :""}],

})
module.exports=mongoose.model("gallery",gallerySchema)