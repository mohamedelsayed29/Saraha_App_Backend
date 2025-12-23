import authRouter from './Modules/Auth/auth.controller.js'
import userRouter from './Modules/User/user.controller.js'
import messageRouter from './Modules/Messages/message.controller.js'
import { connectDB } from './DB/connection.js'
import { globalErrorHandler } from './Utils/errorHandling.utils.js'
import cors from 'cors'
import { startDeleteUnactivatedUsersJob } from './Utils/cron/deleteUnactivatedUser.utils.js'

const bootstrap = async (app,express) =>{
    app.use(express.json())
    await connectDB()
    startDeleteUnactivatedUsersJob()
    app.use(cors())
    app.use('/api/auth',authRouter)
    app.use('/api/users',userRouter)
    app.use('/api/messages',messageRouter)

    app.all('/*dummy' , (req,res,next)=>{
        return next(new Error("Invalid Route",{cause:404}))
    })

    app.use(globalErrorHandler)
}

export default bootstrap; 