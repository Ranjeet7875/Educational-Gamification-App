const express=require("express");
const userRouter=require("./routers/user.router");
const CollectioDB = require("./db");
const app=express()
app.use(express.json())
CollectioDB()
app.get("/",(req,res)=>{
    res.send("EduGame server")
})
app.use("/user",userRouter)
app.listen(3002,()=>{
    console.log("server started")
})