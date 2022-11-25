const mongoose = require("mongoose")

const userShema = mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:100},
    email:{type:String,required:true,minlength:3,maxlength:100},
    password:{type:String,required:true,minlength:3}
})

module.exports = mongoose.model("User",userShema)