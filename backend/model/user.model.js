const mongoose=require("mongoose")
const userScheme=new mongoose.Schema({
    name:String,
    email:String,
    password:String

})
const usermodel=mongoose.model("users",userScheme)
module.exports=usermodel