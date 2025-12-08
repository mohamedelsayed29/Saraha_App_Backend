Error-Handler.utils.js : 
export const globalErrorHandler = (err,req,res,next)=>{
    const status = err.cause || 500
    return res.status(status).json({
        message:"Somsing Error",
        error: err.message,
        stack: err.stack
    })
}

Example : return next(new Error("message" , {cause:404}))

app.controller.js :

app.use(globalErrorHandler)
================================================================================================
return successResponse({res,statusCode:200 , message:"User Created Successfuly" , data: user})
successResponse.utils.js:status

export const successResponse = (
    {
        res,
        statusCode = 200,
        message = "success",
        data = {} 
    } = {} )=>{


    return res.status(statusCode).json({message, data})
}
==================================================================================================
.env file : 
|_index.js
|   |_port
|
|_connection.js
|    |_DB Link
|
|
|
|
|
|
|
