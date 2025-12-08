import { decrypt } from "../../Utils/Encryption/encription.utils.js";
import { successResponse } from "../../Utils/successResponse.utils.js";

export const getUserProfile = async(req ,res , next)=>{

    req.user.phone = decrypt(req.user.phone)
    return successResponse({res , statusCode:200 ,
        message:"User profile fetched successfully" , 
        data:{user:req.user}})

} 