import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/sarahaDB",{serverSelectionTimeoutMS:5000});
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB connection Error ",error.message);
    }
}