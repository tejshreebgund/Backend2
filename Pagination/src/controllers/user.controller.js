const express=require ("express");
const router = express.Router();
const User= require("../models/users.model")
const transporter = require ("../configs/mail")

const adminEmails = ['tejshreeg@gmail.com','honey@gmail.com','singh1150@gmail.com', 'shekh404@gmail.com', 'teju@gmail.com']

router.get("",async function(req,res){
   const page = +req.query.page || 1;
   const size = +req.query.size || 10;
   const offset = (page-1)*size;
   
    const users = await User.find().skip(offset).limit(size).lean().exec();
   const totalusercount= await User.find().countDocuments();
   const totalpages=Math.ceil(totalusercount / size)




    return res.send({users,totalpages, total : totalusercount})
})


//form
router.get("/signup",async function(req,res){

  res.render("users/signup")
})
router.post("/signupp",async function(req,res){


  const user = new User(req.body)
  const result = await user.save()

  let message = {
    from: 'tejshree_fw11_014@masai.school',
    to: user.email,
    subject:` Welcome to ABC system ${user.first_name} ${user.last_name}`,
    text: ` Hi ${user.first_name}, Please confirm your email address`,
  };

  transporter.sendMail(message)
 
  //create a set of admins
  adminEmails.forEach((email)=> {
    let message = {
      from: 'tejshree_fw11_014@masai.school',
      to:email,
      subject:`${user.first_name} ${user.last_name} has registered with us`,
      text:  `Please welcome ${user.first_name} ${user.last_name}`,
    };
  
    transporter.sendMail(message)
  })


  return res.send(result)
})



module.exports= router;