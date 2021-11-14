const express = require("express");
const router = express.Router();
const User = require("../models/users.model");
const protect = require("../middleware/protect")
const Post = require("../models/post.model")

//valid user to post a posts
router.post("/posts",async function(req,res){
    try{
        const users = await Post.create(req.body)
        return res.send(users)
    }catch(e){
        return res
        .status(500)
        .json({status:"failed",message:"Invalid User"});
    }
   
})
//valid user to see all posts
router.get("/posts/:id",async function(req,res){
    try{
        const users = await User.findById(req.params.id).lean().exec()
        const posts = await Post.find().lean().exec()
        return res.send({posts,users})
    }catch(e){
        return res
        .status(500)
        .json({status:"failed",message:"Invalid User"});
    }
   
})

router.get("/posts",async function(req,res){
    const posts = await Post.find().populate({path:"user",select:"_id",select:"email"}).lean().exec();
    return res.send({posts})
})

router.get("/",protect ,async (req,res)=>{
    const users = await User.find({}).select("-password").lean().exec();
    return res.status(200).json({data:users});
})
module.exports=router;