const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const usermodel = require("../model/user.model")
const router=express.Router()
router.post("/create-user",async(req,res)=>{
    const {name,email,password}=req.body
    const userExist=await usermodel.findOne({email})
    if(userExist){
        return res.status(404).send({message:"this email id already used can you use another email id"})
    }
    const hash=await bcrypt.hash(password,10)
    const user=new usermodel({name,email,password:hash})
    user.save()
    res.status(201).send("signup successfully")
})
router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user =await usermodel.findOne({email})
    const ismatch=await bcrypt.compare(password,user.password)
    if(ismatch){
        const token=jwt.sign({masai:"school"},'our_secret_key')
         return res.status(201).send({message:"login successFully",token})
    }
})
module.exports=router