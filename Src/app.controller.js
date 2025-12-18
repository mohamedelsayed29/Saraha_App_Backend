import authRouter from './Modules/Auth/auth.controller.js'
import userRouter from './Modules/User/user.controller.js'
import messageRouter from './Modules/Messages/message.controller.js'
import { connectDB } from './DB/connection.js'
import { globalErrorHandler } from './Utils/errorHandling.utils.js'
import cron from 'node-cron'
import cors from "cors"
import { UserModel } from './DB/Models/user.model.js'

const bootstrap = async (app,express) =>{
    app.use(express.json()) // Pasr body middleware & global middleware

    cron.schedule("0 2 * * *", async () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

        const result = await UserModel.deleteMany({
            confirm_email: false,
            createdAt: { $lt: twoDaysAgo },
        });
    });

    await connectDB()
    app.use(cors())
    app.use('/api/auth',authRouter)
    app.use('/api/users',userRouter)
    app.use('/api/messages',messageRouter)

    app.all('/*dummy' , (req,res,next)=>{
        return next(new Error("Invalied Route",{cause:404}))
    })

    
    // Global Error Handler
    app.use(globalErrorHandler)
}

export default bootstrap; 