import joi from "joi";

export const generalFields = {
    first_name: joi
        .string()
        .trim()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.empty": "First Name is required",
            "string.min": "First Name must be at least 3 characters long",
            "string.max": "First Name must be at most 20 characters long",
            "any.required": "First Name is required"
        }),

    last_name: joi
        .string()
        .trim()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.empty": "Last Name is required",
            "string.min": "Last Name must be at least 3 characters long",
            "string.max": "Last Name must be at most 20 characters long",
            "any.required": "Last Name is required"
        }),

    email: joi
        .string()
        .trim()
        .lowercase()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "org", "io", "eg"] }
        })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address",
            "any.required": "Email is required"
        }),

    password: joi
        .string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base": 
                "Password must be at least 8 characters and contain: uppercase, lowercase, number, and special character (@$!%*?&#)",
            "any.required": "Password is required"
        }),

    confirm_password: joi
        .string()
        .valid(joi.ref("password"))
        .required()
        .messages({
            "any.only": "Passwords must match",
            "string.empty": "Password confirmation is required",
            "any.required": "Password confirmation is required"
        }),

    gender: joi
        .string()
        .valid("male", "female")
        .required()
        .messages({
            "any.only": "Gender must be either 'male' or 'female'",
            "any.required": "Gender is required"
        }),

    role: joi
        .string()
        .valid("USER", "ADMIN")
        .default("USER")
        .messages({
            "any.only": "Role must be either 'USER' or 'ADMIN'"
        }),

    phone: joi
        .string()
        .pattern(/^(\+20|0020|0)?1[0125]\d{8}$/)
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Please provide a valid Egyptian phone number",
            "any.required": "Phone number is required"
        }),
}

export const validation = (Schema) => {
    return (req, res, next) => {
        const validationError = [];
        for (const key of Object.keys(Schema)) {
            const validationResults = Schema[key].validate(req[key], {
                abortEarly: false,
            });
            if (validationResults.error) 
                validationError.push({key,details:validationResults.error.details});
        }
        if(validationError.length)
            return res.status(400).json({error: "Validation Error",details: validationError})

        return next();
    };
};
