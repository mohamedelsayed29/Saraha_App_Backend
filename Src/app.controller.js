import authRouter from './Modules/Auth/auth.controller.js'
import userRouter from './Modules/User/user.controller.js'
import messageRouter from './Modules/Messages/message.controller.js'
import { connectDB } from './DB/connection.js'
import { globalErrorHandler } from './Utils/errorHandling.utils.js'
import cors from 'cors'
import { startDeleteUnactivatedUsersJob } from './Utils/cron/deleteUnactivatedUser.utils.js'
import path from 'node:path'
import * as dotenv from "dotenv"

dotenv.config({path:path.join('./Src/config/.env.dev')})


const bootstrap = async (app,express) =>{
    const port = process.env.PORT
    app.use(express.json())
    await connectDB()
    startDeleteUnactivatedUsersJob()
    app.use(cors())
    app.use('/uploads',express.static(path.resolve('./Src/uploads')))
    app.use('/api/auth',authRouter)
    app.use('/api/users',userRouter)
    app.use('/api/messages',messageRouter)

    app.all('/*dummy' , (req,res,next)=>{
        return next(new Error("Invalid Route",{cause:404}))
    })

    app.use(globalErrorHandler)
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

export default bootstrap; 