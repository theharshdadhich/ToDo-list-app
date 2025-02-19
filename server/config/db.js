import mongoose from "mongoose"

 const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/Todo")
        console.log("database connected")
    } catch (error) {
     console.error("The Error : "+error);
        
    }
}

export default connectDB