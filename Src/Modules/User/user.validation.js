import joi from "joi"
import { generalFields } from "../../Middlewares/validation.middleware.js"

export const shareProfileValidation ={
    params:joi.object({
        userId:generalFields.id.required()
    })
}

export const updateProfileValidation ={
    body:joi.object({
        first_name:generalFields.first_name,
        last_name:generalFields.last_name,
        phone:generalFields.phone,
        age:generalFields.age,      
        gender:generalFields.gender
    })
}