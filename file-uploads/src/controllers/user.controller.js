const fs = require('fs');
const path  = require('path')
const express = require("express");
const upload = require("../middlewares/file-uploads")
const User = require("../models/user.model")
const Gallery = require("../models/gallery.model")
const router = express.Router();

router.get("/",async(req,res)=>{
  const user =await User.find().lean().exec()
    return res.send({user})
})

//create user with profile pic
router.post("/single", upload.single("userimages"),async(req,res)=>{
    // console.log(req.body,'req.body')
    // console.log(req.file,'req.file')

    const user = await User.create({
      first_name:req.body.first_name,
        last_name:req.body.last_name,
        profile:req.file.filename
        
    })
    return res.send({user});
})

//post multiple files
router.post("/multiple" , upload.any("galleryimages") , async(req,res)=>{
  console.log(req.body,'req.body')
    console.log( req.files,'req.files')


    if(req.files.length>5){
      console.log('length more than 5')
    }
    else{
      const filePaths= req.files.map(file=>file.filename)

      const user = await Gallery.create({
          user_id:req.body.user_id,
          pictures:filePaths
      })
      return res.send({user}
       
      )
    }
 
})

//delete user with profile_pic
router.delete("/sin/:id",async(req,res)=>{
  const user2 = await User.findOne({_id:req.params.id})
  const delsingle= user2.profile
    fs.unlinkSync(path.join(__dirname,`../uploads/${delsingle}`))
  
  const mongo2 = await User.findOneAndDelete(req.params.id)
  return res.send(mongo2)
})

//multiple files delete
router.delete("/mul/:id",async(req,res)=>{
  const user1 = await Gallery.findOne({_id:req.params.id})
  console.log(user1)
  const delmultiple= user1.pictures
  delmultiple.map(el=>{
    fs.unlinkSync(path.join(__dirname,`../uploads/${el}`))
  })
 

  const mongo1 = await Gallery.findOneAndDelete({_id:req.params.id})
  return res.send(mongo1)
})

//updating profile pic of user
router.patch("/:id",upload.single("userimages"),async(req,res)=>{
  
  //deleting pic from local server
  const user1 = await User.findOne({_id:req.params.id})
  const delpic=user1.profile
  fs.unlinkSync(path.join(__dirname,`../uploads/${delpic}`))
  
  //updating profile pic
  const profile=req.file.filename
  const user = await User.findByIdAndUpdate(req.params.id,{$set:{profile}},{new:this.true})
  return res.send(user)

})



router.get('/delete/:file/:type/:id', async (req, res)=> {
    
    const file = req.params.file;
    const type = req.params.type;
    const id = req.params.id;

    const pathToFile =  path.join(__dirname,`../uploads/${file}`)
    console.log(pathToFile,'pathToFile')

    try {
        fs.unlinkSync(pathToFile)
        
        if(type === 'user') {
            let deletedProfile = await User.deleteOne({profile:file})
            res.send({data :deletedProfile , success : true})    
        } else if(type === 'gallery') {
            let gallery = await Gallery.findOne({_id : id})

            let newGallery = gallery.pictures.filter((elem)=> elem.fileName !== file)

            gallery.pictures = pictures;
            gallery.save();


        }
       

        console.log("Successfully deleted the file.")
      } catch(err) {
        res.send({data :{} , success : false})
      }
})
    
module.exports=router;