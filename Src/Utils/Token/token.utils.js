import jwt from "jsonwebtoken"
import { roles } from "../../DB/Models/user.model.js";
import { nanoid } from "nanoid";

export const signatureEnum = {
    admin:"Admin",
    user:"User"
};

export const logoutEnum = {
    allDevices:"allDevices",
    logout  :"logout",
    stayloggedIn:"stayloggedIn"
};

export const signToken = ({payload = {} , signature , options = {expiresIn :process.env.ACCESS_TOKEN_EXPIRES_IN}})=>{
    return jwt.sign(payload,signature,options)
}

export const verifyToken = ({token = "" , signature})=>{
    return jwt.verify(token,signature)
} 

export const getSignature = async({ signatureLevel = signatureEnum.user }) => {
    
    let signature = {accessSignature:undefined,refreshSignature:undefined}

    switch (signatureLevel) {
        case signatureEnum.admin:

                signature.accessSignature = process.env.ACCESS_ADMIN_SIGNATURE_TOKEN;
                signature.refreshSignature = process.env.REFRESH_ADMIN_SIGNATURE_TOKEN;
            break;
        case signatureEnum.user:
                signature.accessSignature = process.env.ACCESS_USER_SIGNATURE_TOKEN;
                signature.refreshSignature = process.env.REFRESH_USER_SIGNATURE_TOKEN;
            break;
        default:
            throw new Error("Invalid Signature Level");
    }

    return signature;
};

export const getNewLoginCredentials = async (user) =>{
    let signature = await getSignature({
        signatureLevel: user.role != roles.user ? signatureEnum.admin : signatureEnum.user
    });

    // Generate Jti
    const jwtid = nanoid()

    const accessToken = signToken({
        payload:{_id:user._id} ,
        signature:signature.accessSignature,
        options:{
            issuer:"Saraha App",
            subject:"Authentcation",
            jwtid
        }
    })
    const refreshToken =  signToken({
        payload:{_id:user._id} ,
        signature:signature.refreshSignature,
        options:{
        issuer:"Saraha App",
        subject:"Authentcation",
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        jwtid
    }})
    return {accessToken,refreshToken}
};