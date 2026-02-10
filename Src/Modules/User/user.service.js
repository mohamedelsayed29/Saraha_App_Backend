import { decrypt, encrypt } from "../../Utils/Encryption/encription.utils.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import * as dbService from "../../DB/dbService.js"
import { roles, UserModel } from "../../DB/Models/user.model.js";
import { compare } from "../../Utils/Hashing/hash.utils.js";
import { hash } from "../../Utils/Hashing/hash.utils.js";
import { logoutEnum } from "../../Utils/Token/token.utils.js";
import { TokenModel } from "../../DB/Models/token.model.js";
import { destroyToCloudinary, uploadToCloudinary } from "../../Utils/multer/cloud.multer.js";

export const getUserProfile = async(req ,res , next)=>{

    req.user.phone = decrypt(req.user.phone)
    
    const user = await dbService.findById({
        model:UserModel,
        id:req.user._id,
        populate:[
            {  path:"messages", select:"content attatchments sender_id createdAt" , populate:{path:"sender_id" , select:"name profile_Image"}}
        ]
    });

    return successResponse({res , statusCode:200 ,
        message:"User profile fetched successfully" , 
        data:{user}})
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
    const { old_password, password , flag } = req.body;

    if(!await compare({plainText:old_password,hash:req.user.password}))
        return next (new Error("Old Password is incorrect",{cause:400}));
    let updatedData = {};
    switch (flag) {
        case logoutEnum.allDevices:
            updatedData.changeCredentialsTime = Date.now();
            
            break;
        case logoutEnum.logout:
            await dbService.create({
                model:TokenModel,
                data : [{
                    jti:req.decoded.jti,
                    userId : req.user._id,
                    expireIn: Date.now() - req.decoded.iat
                }],
            });
            break;
    
        default:
            break;
    }

    const user = await dbService.findOneAndUpdate({
        model:UserModel,
        filter:{_id:req.user._id},
        data:{
            password:await hash({plainText:password}),
            ...updatedData
        }
    })

    return user ? successResponse({
        res,
        statusCode:200,
        message:"Password updated successfully",
    })
    : next(new Error("Failed to update password",{cause:400}))
};

export const updateProfileImage = async(req,res,next)=>{

    const {secure_url , public_id} = await uploadToCloudinary({filePath:req.file.path , folder:`Saraha-App/Users/${req.user._id}`})
    
    const user = await dbService.findOneAndUpdate({
        model:UserModel,
        filter:{_id:req.user._id},
        data:{
            profile_cloud_Image:{secure_url , public_id}
        }
    })

    if(req.user.profile_cloud_Image?.public_id){
        await destroyToCloudinary({filePath:req.user.profile_cloud_Image.public_id} )
    }

    return successResponse({
        res,
        statusCode:200,
        message:"Profile Image Updated Successfully",
        data:{user}
    })
};

export const updateCoverImages = async(req,res,next)=>{

    const attachments = [];
    const oldImages = req.user.cover_cloud_Images || [];

    for(const file of req.files){
        const {secure_url , public_id} = await uploadToCloudinary({filePath:file.path , folder:`Saraha-App/Users/${req.user._id}`})
        attachments.push({secure_url , public_id})
    }

    const user = await dbService.findOneAndUpdate({
        model:UserModel,
        filter:{_id:req.user._id},
        data:{
            cover_cloud_Images:attachments 
        }
    })

    for (const image of oldImages) {
        await destroyToCloudinary({ filePath:image.public_id });
    }

    return successResponse({
        res,
        statusCode:200,
        message:"Cover Images Updated Successfully",
        data:{user}
    })
}