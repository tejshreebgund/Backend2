const mongoose = require ("mongoose");
const productSchema= new mongoose.Schema({
    product_name:{type:String,required:true},
    product_price:{type:Number,required:true},
    product_size:{type:String,required:true},
    product_colour:{type:String,required:true}
   

},{
    timestamps:true,
    versionKey:false
})

module.exports= mongoose.model("product",productSchema);
