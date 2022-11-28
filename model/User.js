const mongoose = require("mongoose")

const userShema = mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:100},
    email:{type:String,required:true,minlength:3,maxlength:100},
    password:{type:String,required:true,minlength:3},
    admin:{type:Boolean, default:false}
})

module.exports = mongoose.model("User",userShema)