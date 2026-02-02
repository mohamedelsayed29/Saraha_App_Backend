import joi from "joi"
import { generalFields } from "../../Middlewares/validation.middleware.js"
import { logoutEnum } from "../../Utils/Token/token.utils.js"
import { fileValidation } from "../../Utils/multer/local.multer.js";

export const shareProfileValidation ={
    params:joi.object({
        userId:generalFields.id.required()
    })
};
export const updateProfileValidation ={
    body:joi.object({
        first_name:generalFields.first_name,
        last_name:generalFields.last_name,
        phone:generalFields.phone,
        age:generalFields.age,      
        gender:generalFields.gender
    })
};
export const freezeAccountValidation ={
    params:joi.object({
        userId:generalFields.id
    })
};
export const restoreFreezeAccountAdminValidation ={
    params:joi.object({
        userId:generalFields.id.required()
    })
};
export const restoreFreezeAccountUserValidation ={
    params:joi.object({
        userId:generalFields.id
    })
};
export const hardDeleteAccountValidation ={
    params:joi.object({
        userId:generalFields.id
    })
};
export const updatePasswordValidation ={
    body:joi.object({
        old_password:generalFields.password.required(),
        password:generalFields.password.not(joi.ref("old_password")),
        confirm_password:generalFields.confirm_password.required(),
        flag:joi.string().valid(...Object.values(logoutEnum)).default(logoutEnum.stayloggedIn)
    })
};
export const profileImageValidation ={
    file: joi.object({
        fieldname: generalFields.file.fieldname.required(),
        originalname: generalFields.file.originalname.required(),
        encoding: generalFields.file.encoding.required(),
        mimetype: generalFields.file.mimetype.valid(...fileValidation.image).required(),
        size: generalFields.file.size.max(5 * 1024 * 1024).required(),
        destination: generalFields.file.destination.required(),
        filename: generalFields.file.filename.required(),
        path: generalFields.file.path.required(),
        finalPath: generalFields.file.finalPath.required()
    }).required()
};
export const coverImageValidation = {
    files: joi.array().items(
    joi.object({
        fieldname: generalFields.file.fieldname.required(),
        originalname: generalFields.file.originalname.required(),
        encoding: generalFields.file.encoding.required(),
        mimetype: generalFields.file.mimetype.valid(...fileValidation.image).required(),
        size: generalFields.file.size.max(5 * 1024 * 1024).required(),
        destination: generalFields.file.destination.required(),
        filename: generalFields.file.filename.required(),
        path: generalFields.file.path.required(),
        finalPath: generalFields.file.finalPath.required()
    }).required()
    ).min(1).required()
};

