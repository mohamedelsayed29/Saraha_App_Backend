import authRouter from './Modules/Auth/auth.controller.js'
import userRouter from './Modules/User/user.controller.js'
import messageRouter from './Modules/Messages/message.controller.js'
import { connectDB } from './DB/connection.js'

const bootstrap = async (app,express) =>{
    app.use(express.json())
    await connectDB()
    app.use('/auth',authRouter)
    app.use('/users',userRouter)
    app.use('/messages',messageRouter)
    app.all('/*dummy' , (req,res,next)=>{
        return res.status(404).json({message:`not Found Handler`})
    })
}

export default bootstrap; 