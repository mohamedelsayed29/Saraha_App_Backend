import joi from "joi";
import { generalFields } from "../../Middlewares/validation.middleware.js";

export const signUpValidation = {
    body:joi.object({
        first_name:generalFields.first_name.required(),
        last_name: generalFields.last_name.required(),
        email: generalFields.email.required(),
        password: generalFields.password.required(),
        confirm_password:generalFields.confirm_password,
        gender: generalFields.gender,
        phone:generalFields.phone,
        role:generalFields.role
    }).required(),
};
export const loginValidation = {
    body:joi.object({

        email: generalFields.email.required(),
        password: generalFields.password.required(),

    }).required(),
};

export const socialLoginValidation = {
    body:joi.object({
        idToken: joi.string().required()
    }).required(),
};

export const confirmEmailValidation = {
    body:joi.object({
        email: generalFields.email.required(),
        otp:generalFields.otp.required()
    }).required(),
};

export const forgetPasswordValidation = {
    body:joi.object({
        email: generalFields.email.required(),

    }).required(),
};

export const resetPasswordValidation = {
    body:joi.object({
        email: generalFields.email.required(),
        otp:generalFields.otp.required(),
        password: generalFields.password.required(),
        confirm_password:generalFields.confirm_password
    })
}