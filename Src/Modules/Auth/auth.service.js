import { UserModel } from "../../DB/Models/user.model.js";
import asyncHandler from "../../Utils/asynchandler.js";


export const signup = asyncHandler(async (req , res , next) =>{
        const {first_name,last_name,password,email,gender,phone} = req.body 
        if(await UserModel.findOne({email})){
            return res.status(409).json({message:"Email already exists"});
        }
        const user = await UserModel.create({first_name,last_name,password,email,gender,phone })
        return res.status(201).json({message:"User created successfully",user});
});

export const login = asyncHandler(async (req , res , next) =>{
        const {password,email} = req.body 
        const user = await UserModel.findOne({email , password},{_id:0})
        if(!user){
            return res.status(404).json({message:"Invalied email or password"}); 
        }
        return res.status(201).json({message:"User created successfully",user});
});