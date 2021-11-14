const mongoose = require ("mongoose");
const bcryptjs = require("bcryptjs")
const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:8,maxlength:20}
},{ versionKey:false,timestamps:true}
    );

    userSchema.pre("save",function (next){
        if(!this.isModified("password")) return next();

        bcryptjs.hash(this.password, 8, (err,hash)=>{
            if(err) return next(err);

            this.password=hash;
           return next();
        });
    });

    userSchema.methods.checkPassword=function(password){
        const passwordHash=this.password;
        return new Promise((resolve,reject)=>{
            bcryptjs.compare(password,passwordHash,(err,same)=>{
                if(err) return reject(err);
                resolve(same);
            });
        });
    }



module.exports= mongoose.model("user",userSchema);
