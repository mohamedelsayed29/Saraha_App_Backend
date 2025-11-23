import mongoose, { Schema } from "mongoose";


const genderEnum = {
    male:"male",
    female:"female" 
};
export const userSchema =new Schema({
    first_name:{
        type: String,
        required: true,
        trim: true,
        minLength: [3,"First name must be at least 3 characters"],
        maxLength:[20,"First name must be at most 20 characters"]
    },
    last_name:{
        type: String,
        required: true,
        trim: true,
        minLength: [3,"First name must be at least 3 characters"],
        maxLenghth:[20,"First name must be at most 20 characters"]
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        enum:{
            values : Object.values(genderEnum), // convert to array
            message:"Gender must be male or female"
        }
    },
    phone:{
        type: String,
    },
    confirm_email: Boolean 
},
{timestamps:true}
); 
export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
