
const path = require("path")

const multer=require("multer");

const storage=multer.diskStorage({

    destination:(req,file,cb)=>{          //this function stores the image files in upload folder
        
        cb(null,path.join(__dirname,"../uploads"))  //null removes/hides errors
    
    },
    
    filename:(req,file,cb)=>{
       
        const uniquePrefix= Date.now() + '-' + Math.round(Math.random()*1E9)  //date.now-->time in miliseconds from 1970 till today && Math.round-->gives a big random number
        // console.log(uniquePrefix + "-" + file.originalname);

        cb(null,uniquePrefix + "-" + file.originalname)
    }
})


const fileFilter= (req, file, cb)=> {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  if(file.mimetype=="image/jpeg" || file.mimetype=="image/png"){
       // To accept the file pass `true`, like so:
    cb(null, true)
  }else{
    // To reject this file pass `false`, like so:
    cb(null, false)
  }
   
  
    // You can always pass an error if something goes wrong:
  
  }

module.exports=multer({
    storage:storage,
    fileFilter: fileFilter,
    limits:{
        filesize:1024 * 1024 * 5
    }
})