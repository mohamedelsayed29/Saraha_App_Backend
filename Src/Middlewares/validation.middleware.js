import joi from "joi";

export const generalFields = {
            first_name: joi.string().trim().min(3).max(20).messages({
                "string.min":"First Name must be at least 3 characters long",
                "string.max":"First Name must be at most 20 characters long",
                "any.required":"First Name is required"
            }),
            last_name: joi.string().trim().min(3).max(20).messages({
                "string.min":"Last Name must be at least 3 characters long",
                "string.max":"Last Name must be at most 20 characters long",
                "any.required":"Last Name is required"
            }),
            email:joi.string().email({minDomainSegments:2,tlds:{allow:["com","net","org","io"]}}),
            password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/),
            confirm_password:joi.ref("password"),
            gender: joi.string().valid("male","female"),
            role: joi.string().valid("USER","ADMIN").default("USER"),
            phone: joi.string().pattern(/^(\+20|0020|0)?1[0125]\d{8}$/)
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
