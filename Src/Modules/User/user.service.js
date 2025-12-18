import { decrypt, encrypt } from "../../Utils/Encryption/encription.utils.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import * as dbService from "../../DB/dbService.js"
import { UserModel } from "../../DB/Models/user.model.js";

export const getUserProfile = async(req ,res , next)=>{

    req.user.phone = decrypt(req.user.phone)
    
    return successResponse({res , statusCode:200 ,
        message:"User profile fetched successfully" , 
        data:{user:req.user}})
} 

export const shareProfile = async(req,res,next)=>{
    const {userId} = req.params;
    const user = await dbService.findById({
        model:UserModel,
        id:userId,
    });
    if (user.confirm_email === false) {
        return next(new Error("User email is not verified", { cause: 403 }));
    }
    return user ? successResponse({
        res,
        statusCode:200,
        message:"User profile fetched successfully",
        data:{user}
    })
    : next(new Error("User Not Found",{cause:404}))
};

export const updateProfile = async(req,res,next)=>{

    if (req.body.phone){
        req.body.phone = await encrypt(req.body.phone);
    }
    const updatedUser = await dbService.findOneAndUpdate({
        model:UserModel,
        filter:{_id:req.user._id},
        data:req.body
    });

    return updatedUser ? successResponse({
        res,
        statusCode:200,
        message:"User Updated Successfully",
        data:{updatedUser}
    })
    : next(new Error("Invalid Update",{cause:404}))
};