const mongoose=require("mongoose")
const DB="mongodb+srv://ranvishwakarma122:nNjOcMP7oTBVqWVK@cluster0.cbs5t.mongodb.net/EduGame"
const CollectioDB=async()=>{
    try {
        await mongoose.connect(DB)
        console.log("DB Connected")
    } catch (error) {
        console.log("DB is not connected")
    }
}
module.exports=CollectioDB