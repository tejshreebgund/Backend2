const jwt=require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/users.model")
const Post =  require("../models/post.model")
const newToken = (user)=>{
    return jwt.sign({user},process.env.JWT_SECRET_KEY);
};



const signup = async(req,res)=>{
    let user;
    try{
        //find if email already exists
        user = await User.findOne({email:req.body.email})
        if(user) return res.status(400).send({message:"User already exists"});
        user =await User.create(req.body);
       const  token = newToken(user)
         return res.status(201).json({user:{token}})
    } catch(e){
    return res
    .status(500)
    .json({status:"failed",message:"something went wrong"});
  }
   
};
const signin = async(req,res)=>{
     //we will find the user with email address
    let user
    try{
       
         user = await User.findOne({email:req.body.email}).exec();
        //  console.log(user)
        if(!user)
        return res.status(401).json({
            status:"failed",
            message:"Your email or password is incorrect",
        });
    }catch(e){
        return res
        .staus(500)
        .json({status:"failed",message:"Something went wrong"})
    }
    //we will try to match the password the user has with the password stored in the system which is now not disrect password that user enters
 
    try{
      const  match = await user.checkPassword(req.body.password);
      console.log(match)
        if(!match)
        return res.status(401).json({
            status:"failed",
            message:"Your email or password is incorrect",
        });
    }catch(e){
        return res.status(500).json({status:"failed",message:"Something went wrong",})
    }
    


    //create a new token and return it
    const token = newToken(user);
    return res.status(201).json({data:{token}});
};
module.exports={
    signup,
    signin
}