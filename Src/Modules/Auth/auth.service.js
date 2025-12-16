import { create, findOne } from "../../DB/dbService.js";
import { providers, roles, UserModel } from "../../DB/Models/user.model.js";
import { encrypt } from "../../Utils/Encryption/encription.utils.js";
import { compare, hash } from "../../Utils/Hashing/hash.utils.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
// import { asyncHandler }from "../../Utils/asynchandler.js";
import { getSignature, signatureEnum, signToken } from "../../Utils/Token/token.utils.js";
import { OAuth2Client } from"google-auth-library";
import * as dbService from "../../DB/dbService.js"
import { emailEvent } from "../../Utils/Events/events.utils.js";
import { customAlphabet } from "nanoid"; 

export const signup = async (req, res, next) => { 
  const { first_name, last_name, password, email, gender, phone , role } = req.body;

  if (await findOne({ model: UserModel, filter: { email } })) 
    return next(new Error("Email already Exists", { cause: 409 }));

  const hashedPassword = await hash({plainText: password});
  const encryptionPhone = encrypt(phone);

  // Generate OTP
  const otp = customAlphabet("0123456789", 6)();
  const hashOtp = await hash({plainText:otp})
  emailEvent.emit("confirmEmail",{to:email , otp , first_name });

  const user = await create({
    model: UserModel,
    data:[{
      first_name,
      last_name,
      password:hashedPassword, 
      email,
      gender,
      phone:encryptionPhone,
      role,
      confirm_email_otp : hashOtp
    }],
  });

  return successResponse({
    res,
    statusCode: 201,
    message: "User Created Successfuly",
    data: user ,
  });
};

export const login = async (req, res, next) => {

  const { password, email } = req.body;

  const user = await findOne({ model: UserModel, filter: { email }});

  if (!user) {
    return next(new Error("Invalied email or password", { cause: 401 }));
  }

  if (user.confirm_email !== true) {
    return next(new Error("Email is not confirmed yet", { cause: 403 }));
  }    
  // Compore the hash password
  const isMatch = await compare({ 
    plainText: password, 
    hash: user.password 
  });

  if (!isMatch) {
    return next(new Error("Invalid email or password", { cause: 401 }));
  }

  let signature = await getSignature({
    signatureLevel:user.role != roles.user ? signatureEnum.admin : signatureEnum.user
  })

  const accessToken = signToken({
    payload:{_id:user._id} ,
    signature:signature.accessSignature,
    options:{
      issuer:"Saraha App",
      subject:"Authentcation",
      expiresIn: "1d"
    }
  })
  const refreshToken =  signToken({
    payload:{_id:user._id} ,
    signature:signature.refreshSignature,
    options:{
      issuer:"Saraha App",
      subject:"Authentcation",
      expiresIn: "7d"
  }})

  emailEvent.emit("LoginSuccessfuly", {
    to: user.email,
    first_name: user.first_name
  });

  return successResponse({  
    res,
    statusCode: 200,
    message: "Login successfully",
    data: {accessToken , refreshToken},
  });
};

export const confirmEmail = async (req,res,next)=>{
  const { email , otp } = req.body;

  const user = await dbService.findOne({
    model: UserModel,
    filter:{
      email,
      confirm_email: false,
      confirm_email_otp: { $exists: true }
    }
  });

  if(!user){
    return next(new Error("User Not Found Or Email Already Confirmed",{ cause:401 }));
  }

  const isMatch = await compare({
    plainText: otp,
    hash: user.confirm_email_otp
  });

  if(!isMatch){
    return next(new Error("Invalid OTP",{ cause:400 }));
  }

  await dbService.updateOne({
    model: UserModel,
    filter:{ email },
    data:{
      confirm_email: true,
      $unset:{ confirm_email_otp: true },
      $inc:{ __v:1 }
    }
  });

  return successResponse({
    res,
    statusCode: 200,
    message: "Email confirmed successfully" 
  });
};

async function verifyGoogleAccount({idToken}){
    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    return payload;
}

export const loginWithGamil = async (req, res, next) => {
  const { idToken } = req.body;
  const { email, email_verified, picture, given_name, family_name } =
    await verifyGoogleAccount({ idToken });
  if (!email_verified) return next(new Error("Email Is Not Verifyed", { cause: 401 }));

  const user = await dbService.findOne({
    model: UserModel,
    filter: { email },
  });

  if (user) {
    if (user.provider === providers.google) {
      const accessToken = signToken({
        payload: { _id: user._id },
        options: {
          issuer: "Saraha App",
          subject: "Authentcation",
          expiresIn: "1d",
        },
      });
      const refreshToken = signToken({
        payload: { _id: user._id },
        options: {
          issuer: "Saraha App",
          subject: "Authentcation",
          expiresIn: "7d",
        },
      });
      return successResponse({
        res,
        statusCode: 200,
        message: "Login successfully",
        data: { accessToken, refreshToken },
      });
    }
  }

  const newUser = await dbService.create({
    model: UserModel,
    data: [
      {
        email,
        first_name: given_name,
        last_name: family_name,
        photo: picture,
        provider: providers.google,
        confirm_email: Date.now(),
      },
    ],
  });
  const accessToken = signToken({
    payload: { _id: newUser._id },
    options: {
      issuer: "Saraha App",
      subject: "Authentcation",
      expiresIn: "1d",
    },
  });
  const refreshToken = signToken({
    payload: { _id: newUser._id },
    options: {
      issuer: "Saraha App",
      subject: "Authentcation",
      expiresIn: "7d",
    },
  });
  return successResponse({
    res,
    statusCode: 201,
    message: "User Created successfully",
    data: { accessToken, refreshToken },
  });
};

export const refreshToken = async(req,res,next)=>{
  const user = req.user;
  let signature = await getSignature({
    signatureLevel: user.role != roles.user ? signatureEnum.admin : signatureEnum.user
  })

    const accessToken = signToken({
    payload:{_id:user._id} ,
    signature:signature.accessSignature,
    options:{
      issuer:"Saraha App",
      subject:"Authentcation",
      expiresIn: "1d"
  }
})
  const refreshToken =  signToken({
    payload:{_id:user._id} ,
    signature:signature.refreshSignature,
    options:{
      issuer:"Saraha App",
      subject:"Authentcation",
      expiresIn: "7d"
  }})
  return successResponse({  
    res,
    statusCode: 201,
    message: "New Credentials Created Successfully",
    data: {accessToken , refreshToken},
  });
} 