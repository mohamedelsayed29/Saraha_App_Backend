import jwt from "jsonwebtoken"

export const signatureEnum = {
    admin:"Admin",
    user:"User"
};

export const signToken = ({payload = {} , signature , options = {expiresIn :"1d"}})=>{
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
