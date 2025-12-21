import { decrypt, encrypt } from "../../Utils/Encryption/encription.utils.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import * as dbService from "../../DB/dbService.js"
import { roles, UserModel } from "../../DB/Models/user.model.js";
import { compare } from "../../Utils/Hashing/hash.utils.js";
import { hash } from "../../Utils/Hashing/hash.utils.js";

export const getUserProfile = async(req ,res , next)=>{

    req.user.phone = decrypt(req.user.phone)
    
    return successResponse({res , statusCode:200 ,
        message:"User profile fetched successfully" , 
        data:{user:req.user}})
};

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

export const freezeAccount = async(req, res, next) => {
    const { userId } = req.params;
    
    if (userId && req.user.role !== roles.admin) {
        return next(new Error("Unauthorized", { cause: 403 }));
    }
    
    const updatedUser = await dbService.findOneAndUpdate({
        model: UserModel,
        filter: {
            _id: userId || req.user._id,
            $or: [
                { freezed_at: null },
                { freezed_at: { $exists: false } }
            ]
        },
        data: {
            freezed_at: Date.now(),
            freezed_by: req.user._id,
            $unset: {
                restored_at: 1,
                restored_by: 1
            }
        },
        options: { new: true }
    });
    
    return updatedUser 
        ? successResponse({
            res,
            statusCode: 200,
            message: "User Account Frozen Successfully",
            data: { updatedUser }
        })
        : next(new Error("User not found or already frozen", { cause: 404 }));
};

export const restoreAccountByAdmin = async(req, res, next) => {
    const { userId } = req.params;
    if (req.user.role !== roles.admin) {
        return next(new Error("Unauthorized. Only admins can restore accounts.", { cause: 403 }));
    }
    const updatedUser = await dbService.findOneAndUpdate({
        model: UserModel,
        filter: {
            _id: userId,
            freezed_at: { $exists: true },
            freezed_by: { $ne: userId }
        },
        data: {
            restored_at: Date.now(),
            restored_by: req.user._id,
            $unset: {
                freezed_at: 1,
                freezed_by: 1
            }
        },
        options: { new: true }
    });
    
    return updatedUser 
        ? successResponse({
            res,
            statusCode: 200,
            message: "User Account Restored Successfully",
            data: { updatedUser }
        })
        : next(new Error("User not found or not frozen", { cause: 404 }));
};

export const restoreAccountByUser = async(req,res,next)=>{
    const updateUser = await dbService.findOneAndUpdate({
        model:UserModel,
        filter:{
            _id:req.user._id,
            freezed_at:{$exists:true},
            freezed_by:{$ne:req.user._id}
        },
        data:{
            restored_at:Date.now(),
            restored_by:req.user._id,
            $unset:{
                freezed_at:1,
                freezed_by:1
            }
        },
        options:{new:true}
    });

    return updateUser ? successResponse({
        res,
        statusCode:200,
        message:"User Account Restored Successfully",
        data:{updateUser}
    })
    : next (new Error("User not found or not frozen",{cause:404}))
};

export const deleteAccount = async(req,res,next)=>{
    const { userId } = req.params;

    const deleteUser = await dbService.deleteOne({
        model:UserModel,
        filter:{
            _id:userId,
            freezed_at: { $exists: true },
        }
    })

    return deleteUser.deletedCount ? successResponse({
        res,
        statusCode:200,
        message:"User Account Deleted Successfully",
    })
    : next(new Error("User not found or account is not frozen",{cause:404}))
}; // Hard delete account function

export const updatePassword = async(req,res,next)=>{
    const { old_password, password } = req.body;

    if(!await compare({plainText:old_password,hash:req.user.password}))
        return next (new Error("Old Password is incorrect",{cause:400}));

    const user = await dbService.findOneAndUpdate({
        model:UserModel,
        filter:{_id:req.user._id},
        data:{
            password:await hash({plainText:password})
        }
    })

    return user ? successResponse({
        res,
        statusCode:200,
        message:"Password updated successfully",
    })
    : next(new Error("Failed to update password",{cause:400}))
};